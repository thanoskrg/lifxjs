# lifxjs
A light-weight JavaScript library for using [LIFX HTTP API](https://api.developer.lifx.com).

## Description

Read your lights, turn them on or off, change their colors and activate your favorite scene.

## Important Note

To use `lifxjs`, you need to [obtain a valid OAuth 2 access token](https://api.developer.lifx.com/docs/authentication) first.

## Installation

Install with npm:

```bash
npm install --save lifxjs
```

Install with yarn:

```bash
yarn add lifxjs
```

## Usage

### Import

```javascript
const Lifx = require('lifxjs');
```

### Initialize

```javascript
const lifx = new Lifx();
lifx.init({ appToken: 'APP_TOKEN' });
```

### Get, Turn On or Off and change the Color of your Lights

```javascript
(async function () {

  // get all lights for the given access token
  const lights = await lifx.get.all();

  // find the light you are searching for
  const officeBulb = lights.find(function (light) {
    return light.label === 'Office Bulb';
  });

  // turn the light on
  await lifx.power.light(officeBulb.id, 'on');

  // set its color to a hue value...
  await lifx.color.light(officeBulb.id, {
    hue: 273,
    saturation: 1,
    brightness: 1
  });

  // ...or to a kelvin value
  await lifx.color.light(officeBulb.id, {
    kelvin: 3500,
    brightness: 1
  });

  // turn it off when you're finished...
  await lifx.power.light(officeBulb.id, 'off');

  // ...or turn all the lights off instead
  await lifx.power.all('off');

})();
```

### Get and Activate your favorite Scene

```javascript
(async function () {

  // get all scenes for the given access token
  const scenes = await lifx.get.scenes();

  // find the scene you are searching for
  const movieScene = scenes.find(function (scene) {
    return scene.name === 'Sci-Fi Movie Scene';
  });

  // activate the scene
  await lifx.scene.activate(movieScene.uuid);

})();
```

### API

### `lifx.init(options)`

To initialize the library and then be able to use the features, you first have to invoke `.init()` and pass `options` object as a parameter with the following properties:

| Property           | Details                                                                                 |
| -----------------  | --------------------------------------------------------------------------------------- |
| appToken: `string` | [How to obtain a LIFX Oauth2 Token](https://api.developer.lifx.com/docs/authentication) |

### `lifx.get`

| Method        | Parameters   | Response                                                       |
| ------------- | ------------ | -------------------------------------------------------------- |
| all()         | None         | [List Lights](https://api.developer.lifx.com/docs/list-lights) |
| light(id)     | id: `string` | [List Lights](https://api.developer.lifx.com/docs/list-lights) |
| group(id)     | id: `string` | [List Lights](https://api.developer.lifx.com/docs/list-lights) |
| location(id)  | id: `string` | [List Lights](https://api.developer.lifx.com/docs/list-lights) |
| scenes()      | None         | [List Scenes](https://api.developer.lifx.com/docs/list-scenes) |

### `lifx.power`

| Method               | Parameters                                       | Response                                                   |
| -------------------- | ------------------------------------------------ | ---------------------------------------------------------- |
| all(status)          | status: `'on'` &#124; `'off'`                    | [Set State](https://api.developer.lifx.com/docs/set-state) |
| light(id, status)    | id: `string` <br/> status: `'on'` &#124; `'off'` | [Set State](https://api.developer.lifx.com/docs/set-state) |
| group(id, status)    | id: `string` <br/> status: `'on'` &#124; `'off'` | [Set State](https://api.developer.lifx.com/docs/set-state) |
| location(id, status) | id: `string` <br/> status: `'on'` &#124; `'off'` | [Set State](https://api.developer.lifx.com/docs/set-state) |

### `lifx.color`

| Method                       | Parameters                                                                             | Response                                                   |
| ---------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| all(color, wakeup?)          | color: `LifxColorConfig` <br/> wakeup: `boolean` (default: `true`)                     | [Set State](https://api.developer.lifx.com/docs/set-state) |
| light(id, color, wakeup?)    | id: `string` <br /> color: `LifxColorConfig` <br/> wakeup: `boolean` (default: `true`) | [Set State](https://api.developer.lifx.com/docs/set-state) |
| group(id, color, wakeup?)    | id: `string` <br /> color: `LifxColorConfig` <br/> wakeup: `boolean` (default: `true`) | [Set State](https://api.developer.lifx.com/docs/set-state) |
| location(id, color, wakeup?) | id: `string` <br /> color: `LifxColorConfig` <br/> wakeup: `boolean` (default: `true`) | [Set State](https://api.developer.lifx.com/docs/set-state) |

The `LifxColorConfig` may have the following properties:

| Property                | Example            |
| ----------------------- | ------------------ |
| hex: `string`           | `hex: '#ff000'`    |
| rgb: `string`           | `rgb: '255,255,0'` |
| hue: `[0-360]`          | `hue: 273`         |
| saturation: `[0.0-1.0]` | `saturation: 1`    |
| kelvin: `[1500-9000]`   | `kelvin: 3500`     |
| brightness: `[0.0-1.0]` | `brightness: 0.6`  |

Please note when using `LifxColorConfig`:

1. Neither `hex` nor `rgb` can be combined with `hue`, `saturation`, `kelvin` and `brightness`.
2. One or many of the `hue`, `saturation`, `kelvin`, and `brightness` values can be combined to describe the desired color. [Read more](https://api.developer.lifx.com/v1/docs/colors).

### `lifx.scene`

| Method         | Parameters     | Response                                                             |
| -------------- | -------------- | -------------------------------------------------------------------- |
| activate(uuid) | uuid: `string` | [Activate Scene](https://api.developer.lifx.com/docs/activate-scene) |

## Roadmap

- Add support for effects.

## Run Tests

Run tests once:

```
yarn test
```

Run tests with *watch* option

```
yarn test:watch
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
