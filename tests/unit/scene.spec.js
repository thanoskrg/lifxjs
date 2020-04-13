const superagent = require('superagent');
const Lifx = require('lifxjs');
const mockRequest = require('../mock/request');
const { expectRequestHeaders } = require('./expectations/request');

jest.mock('superagent');
const { headers, payload, request } = mockRequest.mockImplementation(
  superagent
);

const setSceneMockResponse = require('fixtures/setSceneResponse.json');

describe('Lifx.scene', () => {
  const SET_SCENE_URL = LIFX_API_URL + '/scenes/';

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
    request.mockResolvedValue(setSceneMockResponse);
  });

  afterEach(() => {
    // check headers
    expectRequestHeaders(headers, APP_TOKEN);
    // check request payload
    expect(payload).toHaveBeenCalledWith(null);
    // check response
    expect(result).toBe(setSceneMockResponse);
  });

  test('.activate()', async () => {
    const sceneId = 'cc7e0336-43c8-4f00-b874-830690884adc';
    result = await lifx.scene.activate(sceneId);
    const expectedURL = SET_SCENE_URL + 'scene_id:' + sceneId + '/activate';
    expect(superagent).toHaveBeenCalledWith('PUT', expectedURL);
  });
});
