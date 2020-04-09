const LIFX_API = require('./config.json');

module.exports = {
  "moduleNameMapper": {
    "lifxjs": "<rootDir>/index.js",
    "fixtures/(.*)$": "<rootDir>/tests/fixtures/$1",
  },
  "globals": {
    /* sample token */
    APP_TOKEN: 'c52826c87adfa1aa5cc85c87df245e2afdd4bb6c361687bd29869432470cc68d',
    LIFX_API_URL: LIFX_API.BASE_URL + '/v' + LIFX_API.VERSION
  }
};