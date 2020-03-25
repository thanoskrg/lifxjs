require('dotenv').config();

(async function () {
  const Lifx = require('./lib');

  const lifx = new Lifx();

  lifx.init({ appToken: process.env.APP_TOKEN });

  lifx.debug();

  console.log(lifx.lights);

  /* Lights samples */
  // ledStripId = ;

  const ledStrip = await lifx.lights.get('d073d5410d9a');
  if (ledStrip.power === 'on') {
    const res = await ledStrip.off();
    console.log('turned off', res);
    // setTimeout(() => ledStrip.on(), 3000);
  }
  if (ledStrip.power === 'off') {
    const res = await ledStrip.on();
    console.log('turned on', res);
    // setTimeout(() => ledStrip.off(), 3000);
  }
  // ledStrip.off();
  // const ledStrip = await lifx.lights.get('d073d5410d9');
  // console.log('ledStrip', ledStrip);
  // const lights = await lifx.lights.get();
  // console.log('lights', lights);
}())