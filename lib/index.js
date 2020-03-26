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

    return HttpClient;

  }());

  const LifxLight = (function () {

    function LifxLight ({
      id,
      type,
      label,
      connected,
      power,
      group,
      location
    }) {
      this.id = id;
      this.type = type;
      this.label = label;
      this.connected = connected;
      this.power = power;
      this.group = group;
      this.location = location;
    }

    LifxLight.prototype.switch = async function (status) {
      const res = await http.put(endpoint(`/lights/id:${this.id}/state`), {
        power: status,
        fast: false
      });
      if (res.results) {
        const success = res.results
          .find(item => item.id === this.id).status === 'ok';
        if (success) {
          this.power = status;
        }
      }
      return this;
    };

    LifxLight.prototype.on = async function () {
      return await this.switch('on');
    }

    LifxLight.prototype.off = async function () {
      return await this.switch('off');
    };

    return LifxLight;

  }());

  const LifxLights = (function () {

    function LifxLights () {

    }

    async function getAll () {
      return await http.get(endpoint('/lights/all'));
    }

    async function getById (id) {
      const res = await http.get(endpoint(`/lights/id:${id}`));
      if (res.error) return res;
      const light = res[0];
      return new LifxLight({
        id: light.id,
        type: light.product.name,
        label: light.label,
        connected: light.connected,
        power: light.power,
        group: light.group,
        location: light.location
      });
    }

    LifxLights.prototype.get = function (id = null) {
      return Boolean(id) ? getById(id) : getAll();
    }

    return LifxLights;

  }());

  const Lifx = (function () {

    let _lights;

    function Lifx () {

    }

    Lifx.prototype = {
      get lights () {
        if (!_lights) {
          console.warn('Call .init() first to get access to your lights.');
          return {
            get () {}
          };
        }
        return _lights;
      },
      set (value) {
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
      _lights = new LifxLights(http);
    }

    /* TODO: Remove */
    Lifx.prototype.debug = function () {
      if (http instanceof HttpClient) {
        // _http
        //   .get(LIFX_API.endpoint('/lights/all'))
        //   .then(lights => {
        //     console.log(`I have ${lights.length} lights`);
        //   });

        // _http
        //   .put(
        //     LIFX_API.endpoint('/lights/d073d5410d9a/state'),
        //     {
        //       power: 'on',
        //       // power: 'off',
        //       fast: false
        //     }
        //   )
        //   .then(res => {
        //     console.log(res);
        //   });
      }
    }

    return Lifx;

  }());

  return Lifx;

}());