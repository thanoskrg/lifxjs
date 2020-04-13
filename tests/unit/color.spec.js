const superagent = require('superagent');
const Lifx = require('lifxjs');
const mockRequest = require('../mock/request');
const { expectRequestHeaders } = require('./expectations/request');

jest.mock('superagent');
const { headers, payload, request } = mockRequest.mockImplementation(
  superagent
);

const setStateMockResponse = require('fixtures/setStateResponse.json');

describe('Lifx.color', () => {
  const SET_STATE_URL = selector =>
    LIFX_API_URL + '/lights/' + selector + '/state';

  let lifx;
  let result;

  beforeAll(() => {
    lifx = new Lifx();
    lifx.init({ appToken: APP_TOKEN });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    request.mockReset();
  });

  beforeEach(() => {
    result = null;
    request.mockResolvedValue(setStateMockResponse);
  });

  afterEach(() => {
    // check headers
    expectRequestHeaders(headers, APP_TOKEN);
    // check response
    expect(result).toBe(setStateMockResponse);
  });

  /**
   * Test .all() with COLOR_HEX
   *  */
  test('.all()', async () => {
    result = await lifx.color.all({
      hex: '#ff0000'
    });
    // check request payload
    expect(payload).toHaveBeenCalledWith({
      color: '#FF0000',
      power: 'on'
    });
    const expectedURL = SET_STATE_URL('all');
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
  });

  /**
   * Test .light() with COLOR_RGB
   *  */
  test('.light()', async () => {
    const lightId = 'd073d5141876';
    result = await lifx.color.light(lightId, {
      rgb: '255,255,0'
    });
    // check request payload
    expect(payload).toHaveBeenCalledWith({
      color: 'rgb:255,255,0',
      power: 'on'
    });
    const expectedURL = SET_STATE_URL('id:' + lightId);
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
  });

  /**
   * Test .group() with COLOR_HUE + COLOR_SATURATION
   * Also pass third parameter "wakeup" to false.
   *  */
  test('.group()', async () => {
    const groupId = '06e3ec50395511e9a0757200055bf1c0';
    result = await lifx.color.group(
      groupId,
      {
        hue: 273.65,
        saturation: 0.5
      },
      false
    );
    // check request payload - "power" shouldn't be set since "wakeup: false"
    expect(payload).toHaveBeenCalledWith({
      color: 'hue:273.65 saturation:0.5'
    });
    const expectedURL = SET_STATE_URL('group_id:' + groupId);
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
  });

  /**
   * Test .location() with COLOR_KELVIN + COLOR_BRIGHTNESS
   *  */
  test('.location()', async () => {
    const locationId = 'f2c1aa82395411e9a0757200055bf1c0';
    result = await lifx.color.location(locationId, {
      kelvin: 3500,
      brightness: 0.8
    });
    // check request payload
    expect(payload).toHaveBeenCalledWith({
      color: 'kelvin:3500 brightness:0.8',
      power: 'on'
    });
    const expectedURL = SET_STATE_URL('location_id:' + locationId);
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
  });
});
