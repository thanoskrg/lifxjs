require('dotenv').config();

const Lifx = require('./lib');

const lifx = new Lifx();

lifx.init({ appToken: process.env.APP_TOKEN });

lifx.debug();