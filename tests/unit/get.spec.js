const superagent = require('superagent');
const Lifx = require('lifxjs');
const mockRequest = require('../mock/request');
const { expectRequestHeaders } = require('./expectations/request');

jest.mock('superagent');
const { headers, payload, request } = mockRequest.mockImplementation(
  superagent
);

const getLightsMockResponse = require('fixtures/getLightsResponse.json');
const getScenesMockResponse = require('fixtures/getScenesResponse.json');

describe('Lifx.get', () => {
  let lifx;

  beforeAll(() => {
    lifx = new Lifx();
    lifx.init({ appToken: APP_TOKEN });
  });

  beforeEach(() => {
    jest.clearAllMocks();
    request.mockReset();
  });

  /**
   * GET LIGHT(S):
   *  all
   *  light
   *  group
   *  location
   * */
  describe('', () => {
    const GET_LIGHTS_URL = LIFX_API_URL + '/lights/';
    let result;

    beforeEach(() => {
      result = null;
      request.mockResolvedValue(getLightsMockResponse);
    });

    afterEach(() => {
      // check headers
      expectRequestHeaders(headers, APP_TOKEN);
      // check request payload
      expect(payload).toHaveBeenCalledWith(null);
      // check response
      expect(result).toBe(getLightsMockResponse);
    });

    test('.all()', async () => {
      result = await lifx.get.all();
      const expectedURL = GET_LIGHTS_URL + 'all';
      expect(superagent).toHaveBeenCalledWith('GET', expectedURL);
    });

    test('.light()', async () => {
      const lightId = 'd073d5141876';
      result = await lifx.get.light(lightId);
      const expectedURL = GET_LIGHTS_URL + 'id:' + lightId;
      expect(superagent).toHaveBeenCalledWith('GET', expectedURL);
    });

    test('.group()', async () => {
      const groupId = '06e3ec50395511e9a0757200055bf1c0';
      result = await lifx.get.group(groupId);
      const expectedURL = GET_LIGHTS_URL + 'group_id:' + groupId;
      expect(superagent).toHaveBeenCalledWith('GET', expectedURL);
    });

    test('.location()', async () => {
      const locationId = 'f2c1aa82395411e9a0757200055bf1c0';
      result = await lifx.get.location(locationId);
      const expectedURL = GET_LIGHTS_URL + 'location_id:' + locationId;
      expect(superagent).toHaveBeenCalledWith('GET', expectedURL);
    });
  });

  /**
   * GET SCENES
   */
  describe('', () => {
    const GET_SCENES_URL = LIFX_API_URL + '/scenes';
    let result;

    beforeEach(() => {
      result = null;
      request.mockResolvedValue(getScenesMockResponse);
    });

    afterEach(() => {
      // check headers
      expectRequestHeaders(headers, APP_TOKEN);
      // check request payload
      expect(payload).toHaveBeenCalledWith(null);
      // check response
      expect(result).toBe(getScenesMockResponse);
    });

    test('.scenes()', async () => {
      result = await lifx.get.scenes();
      expect(superagent).toHaveBeenCalledWith('GET', GET_SCENES_URL);
    });
  });
});
