const Http = require('./http');

const Lifx = (function () {

  const LIFX_API = {
    BASE_URL: "https://api.lifx.com",
    VERSION: 1,
    url(resource = '') {
      return `${this.BASE_URL}/v${this.VERSION}${resource}`
    }
  };

  let _http;

  function Lifx () {

  }

  /* TODO: Remove */
  Lifx.prototype.debug = function () {
    // console.log(LIFX_API.url());
    if (_http instanceof Http) {
      _http
        .get(LIFX_API.url('/lights/all'))
        .then(lights => {
          console.log(lights);
        });
    }
  }

  Lifx.prototype.init = function ({ appToken }) {
    _http = new Http({
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${appToken}`
      }
    });
  }

  return Lifx;

}());

module.exports = Lifx;