require('dotenv').config();

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

  /* get all ligts */
  // const all = await lifx.lights.get();
  // console.log(all);

  /* get specific light */
  const light = await lifx.lights.get('d073d5410d9a');
  console.log(light.label, light.power);

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

  /* toggle light */
  // const toggled = await light.toggle();
  // console.log('toggled', toggled.power);

  /* toggle lights */
  // console.log(office);
  // const toggled0 = await office[0].toggle();
  // console.log(toggled0.power);

  // const toggled1 = await office[1].toggle();
  // console.log(toggled1.power);

  // office.forEach(light => light.toggle());

  /* set color */
  // const lightUpdated = await light.setColor({
  //   hue: 273.99771114671546,
  //   saturation: 1,
  //   brightness: 1
  // });
  // console.log(lightUpdated);
  // await light.setColor({ kelvin: 3500 });

}())