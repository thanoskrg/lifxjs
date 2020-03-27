require('dotenv').config();

OFFICE_LED_ID  = 'd073d5410d9a';
OFFICE_BULB_ID = 'd073d5031409';
GROUP_ID       = '9586957cca3ec7a5b7b6cd3c5a6b576e';
LOCATION_ID    = 'fb0316a80c3bda267ddff899b3f504bb';
ERGO_SCENE_ID  = '401f04ac-ae14-445c-a662-ce8c4a47be61';

COLOR_HUE    = { hue: 273.99771114671546, saturation: 1, brightness: 1 }
COLOR_KELVIN = { kelvin: 3500, brightness: 1 };

(async function () {

  // import Lifx from 'lifx';

  // const lifx = new Lifx();

  // lifx.init({ appToken: process.env.APP_TOKEN });

  // console.log(await lifx.get.lights());
  // console.log(await lifx.get.scenes());

  // console.log(await lifx.power.all('on'));
  // console.log(await lifx.power.light(OFFICE_LED_ID, 'off'));
  // console.log(await lifx.power.group(GROUP_ID, 'off'));
  // console.log(await lifx.power.location(LOCATION_ID, 'off'));

  // console.log(await lifx.color.all({}));
  // console.log(await lifx.color.light(OFFICE_LED_ID, COLOR_KELVIN));
  // console.log(await lifx.color.light(OFFICE_BULB_ID, COLOR_HUE));
  // console.log(await lifx.color.group(GROUP_ID, COLOR_HUE));
  // console.log(await lifx.color.location(LOCATION_ID, COLOR_KELVIN));

  // console.log(await lifx.scene.activate(ERGO_SCENE_ID));

}());