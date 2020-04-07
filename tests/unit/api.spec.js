const Lifx = require('../../index');
const { APP_TOKEN_VALID } = require('../fixtures/appToken');
const {
  expectLifxGetInterface,
  expectLifxPowerInterface,
  expectLifxColorInterface,
  expectLifxSceneInterface
} = require('./expectations/api');

describe('Lifx.API', () => {
  const warnSpy = jest.spyOn(console,'warn')
    .mockImplementation();

  const getWarningMessage = prop => (
    `Call init() first to use "${prop}".`
  );

  it('exports Lifx', () => {
    expect(typeof Lifx).toBe('function');
  });

  let lifx = new Lifx();

  it('should export a class', () => {
    expect(lifx).toBeInstanceOf(Lifx);
  });

  it('should have ".init()" property', () => {
    expect(typeof lifx.init).toBe('function');
  });

  describe('Before Initialization', () => {

    afterAll(() => warnSpy.mockClear());

    it('should have ".get" property', () => {
      const lifxGet = lifx.get;
      expectLifxGetInterface(lifxGet);
      const expectedMsg = getWarningMessage('get');
      expect(warnSpy).toHaveBeenCalledWith(expectedMsg);
    });

    it('should have ".power" property', () => {
      const lifxPower = lifx.power;
      expectLifxPowerInterface(lifxPower);
      const expectedMsg = getWarningMessage('power');
      expect(warnSpy).toHaveBeenCalledWith(expectedMsg);
    });

    it('should have ".color" property', () => {
      const lifxColor = lifx.color;
      expectLifxColorInterface(lifxColor);
      const expectedMsg = getWarningMessage('color');
      expect(warnSpy).toHaveBeenCalledWith(expectedMsg);
    });

    it('should have ".scene" property', () => {
      const lifxScene = lifx.scene;
      expectLifxSceneInterface(lifxScene);
      const expectedMsg = getWarningMessage('scene');
      expect(warnSpy).toHaveBeenCalledWith(expectedMsg);
    });

  });

  describe('After Initialization', () => {

    beforeAll(() => lifx.init({
      appToken: APP_TOKEN_VALID
    }));

    it('should have ".get" property', () => {
      const lifxGet = lifx.get;
      expectLifxGetInterface(lifxGet);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should have ".power" property', () => {
      const lifxPower = lifx.power;
      expectLifxPowerInterface(lifxPower);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should have ".color" property', () => {
      const lifxColor = lifx.color;
      expectLifxColorInterface(lifxColor);
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('should have ".scene" property', () => {
      const lifxScene = lifx.scene;
      expectLifxSceneInterface(lifxScene);
      expect(warnSpy).not.toHaveBeenCalled();
    });

  });

});