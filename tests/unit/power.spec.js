const superagent = require('superagent');
const Lifx = require('lifxjs');
const mockRequest = require('../mock/request');
const { expectRequestHeaders } = require('./expectations/request');

jest.mock('superagent');
const { headers, payload, request } = mockRequest.mockImplementation(
  superagent
);

const setStateMockResponse = require('fixtures/setStateResponse.json');

describe('Lifx.power', () => {
  /**
   * Valid "power" values are (on|off).
   * Although lifxjs library does not check the validity
   * as it intentionally acts as a pass-through mechanism.
   * So, we should check that whatever value is passed,
   * it will be sent to the LIFX HTTP API as is.
   * */
  const POWER_STATE = 'on';
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

  test('.all()', async () => {
    result = await lifx.power.all(POWER_STATE);
    const expectedURL = SET_STATE_URL('all');
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
    expect(payload).toHaveBeenCalledWith({
      power: POWER_STATE,
      duration: 1
    });
  });

  test('.light()', async () => {
    const lightId = 'd073d5141876';
    result = await lifx.power.light(lightId, POWER_STATE, 5);
    const expectedURL = SET_STATE_URL('id:' + lightId);
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
    expect(payload).toHaveBeenCalledWith({
      power: POWER_STATE,
      duration: 5
    });
  });

  test('.group()', async () => {
    const groupId = '06e3ec50395511e9a0757200055bf1c0';
    result = await lifx.power.group(groupId, POWER_STATE);
    const expectedURL = SET_STATE_URL('group_id:' + groupId);
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
    expect(payload).toHaveBeenCalledWith({
      power: POWER_STATE,
      duration: 1
    });
  });

  test('.location()', async () => {
    const locationId = 'f2c1aa82395411e9a0757200055bf1c0';
    result = await lifx.power.location(locationId, POWER_STATE);
    const expectedURL = SET_STATE_URL('location_id:' + locationId);
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
    expect(payload).toHaveBeenCalledWith({
      power: POWER_STATE,
      duration: 1
    });
  });
});
