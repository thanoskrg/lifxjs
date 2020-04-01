const superagent = require('superagent');

module.exports = (function () {

  const LIFX_API = {
    BASE_URL: 'https://api.lifx.com',
    VERSION:  1,
  };

  const LIFX_API_PATH = {
    LIGHTS: '/lights',
    SCENES: '/scenes'
  };

  const LIGHT_SELECTOR = {
    ALL:         'all',
    LIGHT_ID:    'id:',
    GROUP_ID:    'group_id:',
    LOCATION_ID: 'location_id:'
  };

  function endpoint (resource = '') {
    return `${LIFX_API.BASE_URL}/v${LIFX_API.VERSION}${resource}`;
  }

  let http;

  const HttpClient = (function () {

    let _headers;

    function request (method, url, data = null) {
      return new Promise(resolve => {
        try {
          superagent(method, url)
            .set(_headers)
            .send(data)
            .then(res => {
              resolve(res.body);
            })
            .catch(err => {
              if (err && err.response && err.response.body) {
                resolve(err.response.body);
              } else {
                resolve({ error: err.message });
              }
            });
        } catch (err) {
          console.log('Unexpected Error:', err.message);
          resolve({ error: err.message });
        }
      });
    }

    function HttpClient ({ headers = {} }) {
      _headers = headers;
    }

    HttpClient.prototype.get = async function (resource) {
      return await request('GET', resource);
    };

    HttpClient.prototype.put = async function (resource, data) {
      return await request('PUT', resource, data);
    };

    HttpClient.prototype.post = async function (resource, data) {
      return await request('POST', resource, data);
    };

    return HttpClient;

  }());

  const LifxGet = (function () {

    const GET_LIGHTS_URL = endpoint(LIFX_API_PATH.LIGHTS + '/');
    const GET_SCENES_URL = endpoint(LIFX_API_PATH.SCENES);

    function LifxGet () {}

    LifxGet.prototype.all = async function () {
      return http.get(
        GET_LIGHTS_URL + LIGHT_SELECTOR.ALL
      );
    };

    LifxGet.prototype.light = async function (id) {
      return http.get(
        GET_LIGHTS_URL + LIGHT_SELECTOR.LIGHT_ID + id
      );
    };

    LifxGet.prototype.group = async function (id) {
      return http.get(
        GET_LIGHTS_URL + LIGHT_SELECTOR.GROUP_ID + id
      );
    };

    LifxGet.prototype.location = async function (id) {
      return http.get(
        GET_LIGHTS_URL + LIGHT_SELECTOR.LOCATION_ID + id
      );
    };

    LifxGet.prototype.scenes = async function () {
      return http.get(GET_SCENES_URL);
    };

    return LifxGet;

  }());

  const LifxColor = (function () {

    function LifxColor () {}

    LifxColor.prototype.all = async function (
      config,
      wakeup
    ) {
      return await set_color_state(
        LIGHT_SELECTOR.ALL, config, wakeup
      );
    };

    LifxColor.prototype.light = async function (
      id,
      config,
      wakeup
    ) {
      return await set_color_state(
        LIGHT_SELECTOR.LIGHT_ID + id, config, wakeup
      );
    };

    LifxColor.prototype.group = async function (
      id,
      config,
      wakeup
    ) {
      return await set_color_state(
        LIGHT_SELECTOR.GROUP_ID + id, config, wakeup
      );
    };

    LifxColor.prototype.location = async function (
      id,
      config,
      wakeup
    ) {
      return await set_color_state(
        LIGHT_SELECTOR.LOCATION_ID + id, config, wakeup
      );
    };

    function get_color_selector ({
      hex,
      rgb,
      hue,
      saturation,
      kelvin,
      brightness
    }) {
      /**
       * Based on LIFX HTTP API documentation
       * "hex" and "rgb" cannot be combined with
       * "hue", "saturation", "kelvin" and "brightness"
       */
      let colorSelector = [];
      if (hex) {
        colorSelector.push(String(hex).toUpperCase());
      } else if (rgb) {
        colorSelector.push('rgb:' + String(rgb));
      } else {
        if (hue) {
          colorSelector.push('hue:' + String(hue));
        }
        if (saturation) {
          colorSelector.push('saturation:' + String(saturation));
        }
        if (kelvin) {
          colorSelector.push('kelvin:' + String(kelvin));
        }
        if (brightness) {
          colorSelector.push('brightness:' + String(brightness));
        }
        colorSelector = colorSelector.join(' ');
      }
      return colorSelector;
    }

    async function set_color_state (selector, color, wakeup = true) {
      const data = {
        color: get_color_selector(color)
      };
      if (wakeup) data['power'] = 'on';
      return await http.put(
        endpoint(LIFX_API_PATH.LIGHTS + `/${selector}/state`),
        data
      );
    }

    return LifxColor;

  }());

  const LifxPower = (function () {

    function LifxPower () {}

    LifxPower.prototype.all = async function (power) {
      return await set_power_state(LIGHT_SELECTOR.ALL, power);
    };

    LifxPower.prototype.light = async function (id, power) {
      return await set_power_state(LIGHT_SELECTOR.LIGHT_ID + id, power);
    };

    LifxPower.prototype.group = async function (id, power) {
      return await set_power_state(LIGHT_SELECTOR.GROUP_ID + id, power);
    };

    LifxPower.prototype.location = async function (id, power) {
      return await set_power_state(LIGHT_SELECTOR.LOCATION_ID + id, power);
    };

    async function set_power_state (selector, power) {
      return await http.put(
        endpoint(LIFX_API_PATH.LIGHTS + `/${selector}/state`),
        { power }
      );
    }

    return LifxPower;

  }());

  const LifxScene = (function () {

    function LifxScene () {}

    LifxScene.prototype.activate = async function (uuid) {
      return await http.put(
        endpoint(LIFX_API_PATH.SCENES + `/scene_id:${uuid}/activate`)
      );
    };

    return LifxScene;

  }());

  const Lifx = (function () {

    function getWarningMsgNotInitialized (name) {
      return `Call init() first to use "${name}".`;
    }

    let $private = {};
    let __$$id__ = 0;
    function _ (_this, store = null) {
      return store
        ? $private[_this.__$$id__] = store
        : $private[_this.__$$id__]
      ;
    }

    function Lifx () {
      this.__$$id__ = __$$id__++;
      _(this, {});
    }

    Lifx.prototype.init = function (config) {
      if (config && config.appToken) {
        http = new HttpClient({
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${config.appToken}`
          }
        });
        _(this, {
          get: new LifxGet(),
          power: new LifxPower(),
          color: new LifxColor(),
          scene: new LifxScene()
        });
      } else {
        console.warn('Missing "appToken" to initialize Lifx.');
      }
    };

    Object.defineProperty(Lifx.prototype, 'get', {
      get() {
        const lifxGet = _(this).get;
        if (!lifxGet) {
          console.warn(getWarningMsgNotInitialized('get'));
          return {
            all() {},
            light() {},
            group() {},
            location() {},
            scenes() {}
          };
        }
        return lifxGet;
      }
    });

    Object.defineProperty(Lifx.prototype, 'power', {
      get() {
        const lifxPower = _(this).power;
        if (!lifxPower) {
          console.warn(getWarningMsgNotInitialized('power'));
          return {
            all() {},
            light() {},
            group() {},
            location() {}
          };
        }
        return lifxPower;
      }
    });

    Object.defineProperty(Lifx.prototype, 'color', {
      get() {
        const lifxColor = _(this).color;
        if (!lifxColor) {
          console.warn(getWarningMsgNotInitialized('color'));
          return {
            all() {},
            light() {},
            group() {},
            location() {}
          };
        }
        return lifxColor;
      }
    });

    Object.defineProperty(Lifx.prototype, 'scene', {
      get() {
        const lifxScene = _(this).scene;
        if (!lifxScene) {
          console.warn(getWarningMsgNotInitialized('scene'));
          return {
            activate() {}
          };
        }
        return lifxScene;
      }
    });

    return Lifx;

  }());

  return Lifx;

}());