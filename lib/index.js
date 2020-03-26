const superagent = require('superagent');

module.exports = (function () {

  const LIFX_API = {
    BASE_URL: "https://api.lifx.com",
    VERSION: 1,
  };

  function endpoint (resource = '') {
    return `${LIFX_API.BASE_URL}/v${LIFX_API.VERSION}${resource}`;
  }

  let http;

  const HttpClient = (function () {

    let _headers;

    function request (method, url, data = null) {
      return new Promise(async (resolve) => {
        try {
          await superagent(method, url)
            .set(_headers)
            .send(data)
            .then(res => {
              if (res.ok) {
                resolve(res.body);
              }
            })
            .catch(err => {
              /**
               *
               * TODO: Handle all cases
               * https://lifx.readme.io/docs/errors
               *
               */
              if (err.status === 400) {
                const { error } = err.response.body;
                resolve({ error });
              } else if (err.status > 400 && err.status < 500) {
                resolve({ error: err.message });
              } else {
                throw err;
              }
            });
        } catch (err) {
          console.log('Unexpected Error:', err.message);
          resolve();
        }
      })
    }

    function HttpClient ({ headers = {} }) {
      _headers = headers;
    }

    HttpClient.prototype.get = async function (resource) {
      return await request('GET', resource);
    }

    HttpClient.prototype.put = async function (resource, data) {
      return await request('PUT', resource, data);
    }

    HttpClient.prototype.post = async function (resource, data) {
      return await request('POST', resource, data);
    }

    return HttpClient;

  }());

  const LifxLight = (function () {

    function isSuccessResult (res, id) {
      if (Array.isArray(res.results)) {
        const updated = res.results.find(result => result.id === id);
        return updated && updated.status === 'ok';
      }
      return false;
    }

    let private = {};
    function _ (instance, store = null) {
      if (store) {
        private[instance.id] = store;
        return;
      }
      return private[instance.id];
    }

    function LifxLight ({
      id,
      label,
      connected,
      power,
      color,
      brightness,
      zones,
      group,
      location,
      product,
    }) {
      this.id = id;
      this.label = label;
      this.connected = connected;
      this.power = power;
      this.color = color;
      this.brightness = brightness;
      this.zones = zones;
      this.group = group;
      this.location = location;
      this.product = product;
      _(this, {
        apiurl: endpoint('/lights/id:' + this.id)
      });
    }

    LifxLight.prototype.toggle = async function () {
      const res = await http.post(_(this).apiurl + '/toggle');
      if (isSuccessResult(res, this.id)) {
        this.power = this.power === 'on' ? 'off' : 'on';
      }
      return this;
    }

    LifxLight.prototype.setState = async function ({ power, color }) {
      const apiurl = _(this).apiurl;
      const params = { power, color };
      const res = await http.put(apiurl + '/state', params);
      if (isSuccessResult(res, this.id)) {
        const updatedState = await http.get(apiurl);
        if (Array.isArray(updatedState)) {
          const { power, color, connected, brightness } = updatedState[0];
          this.connected = connected;
          this.power = power;
          this.color = color;
          this.brightness = brightness;
        }
      }
      return this;
    }

    LifxLight.prototype.setColor = async function ({ hex, rgb, hue, saturation, kelvin, brightness }) {
      /**
       * Note:
       * hex and rgb cannot be combined with hue, saturation, kelvin and brightness
       */
      let colorSelector = [];
      if (hex) {
        colorSelector.push(String(hex).toUpperCase());
      } else if (rgb) {
        colorSelector.push(String(rgb).toLowerCase());
      } else {
        if (hue) colorSelector.push('hue:' + String(hue));
        if (saturation) colorSelector.push('saturation:' + String(saturation));
        if (kelvin) colorSelector.push('kelvin:' + String(kelvin));
        if (brightness) colorSelector.push('brightness:' + String(brightness));
        colorSelector = colorSelector.join(' ');
      }
      return await this.setState({
        power: 'on',
        color: colorSelector
      });
    }

    return LifxLight;

  }());

  const LifxLights = (function () {

    async function getLights (selector) {
      const res = await http.get(endpoint(`/lights/${selector}`));
      if (res.error) return res;
      return res.map(light => new LifxLight({
        id: light.id,
        label: light.label,
        connected: light.connected,
        power: light.power,
        color: light.color,
        brightness: light.brightness,
        zones: light.zones,
        group: light.group,
        location: light.location,
        product: light.product
      }));
    }

    function LifxLights () { }

    LifxLights.prototype.get = async function (lightId = null) {
      if (lightId) {
        const res = await getLights(`id:${lightId}`);
        return Array.isArray(res) ? res[0] : res;
      }
      return await getLights('all');
    }

    LifxLights.prototype.getGroup = async function (groupId) {
      return await getLights(`group_id:${groupId}`);
    }

    LifxLights.prototype.getLocation = async function (locationId) {
      return await getLights(`location_id:${locationId}`);
    }

    return LifxLights;

  }());

  const Lifx = (function () {

    let _lights;

    function Lifx () {

    }

    Lifx.prototype = {
      get lights () {
        if (_lights instanceof LifxLights) return _lights;
        console.warn('Call init() first to get lights access.');
        return {
          get () {},
          getGroup () {},
          getLocation () {},
        };
      },
      set lights (value) {
        _lights = value;
      }
    };

    Lifx.prototype.init = function ({ appToken }) {
      http = new HttpClient({
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${appToken}`
        }
      });
      this.lights = new LifxLights(http);
    }

    /* TODO: Remove */
    Lifx.prototype.debug = function () {
      if (http instanceof HttpClient) {

      }
    }

    return Lifx;

  }());

  return Lifx;

}());