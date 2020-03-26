require('dotenv').config();

function prettyLog (object, asJson = false) {
  console.log(asJson ? JSON.stringify(object, null, 2) : object);
}

(async function () {
  const Lifx = require('./lib');

  const lifx = new Lifx();

  lifx.init({ appToken: process.env.APP_TOKEN });

  lifx.debug();

  /**
   *
   * LIFX Lights
   *
   */

  /* get specific light */
  // const all = await lifx.lights.get();
  // console.log(all);

  const light = await lifx.lights.get('d073d5031409');
  console.log(light);

  // const toggled = await light.toggle();
  // console.log('toggled', toggled);


  // prettyLog(led);

  /* get specific group lights */
  // const office = await lifx.lights.getGroup('9586957cca3ec7a5b7b6cd3c5a6b576e');
  // prettyLog(office);

  /* get specific location lights */
  // const home = await lifx.lights.getLocation('fb0316a80c3bda267ddff899b3f504bb');
  // prettyLog(home);

  /**
   *
   * LIFX Light
   *
   */

  /* Lights samples */
  // const led = await lifx.lights.get('d073d5410d9a');
  // led.on();


  // if (ledStrip.power === 'on') {
  //   const res = await ledStrip.off();
  //   console.log('turned off', res);
  //   // setTimeout(() => ledStrip.on(), 3000);
  // }
  // if (ledStrip.power === 'off') {
  //   const res = await ledStrip.on();
  //   console.log('turned on', res);
  //   // setTimeout(() => ledStrip.off(), 3000);
  // }
  // ledStrip.off();
  // const ledStrip = await lifx.lights.get('d073d5410d9');
  // console.log('ledStrip', ledStrip);
  // const lights = await lifx.lights.get();
  // console.log('lights', lights);
}())