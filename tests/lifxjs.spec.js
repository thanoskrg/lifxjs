const Lifx = require('../index');
const {
  expectLifxGetInterface,
  expectLifxPowerInterface,
  expectLifxColorInterface,
  expectLifxSceneInterface
} = require('./expectations/api');

const warnSpy = jest.spyOn(console, 'warn').mockImplementation();

it('exports Lifx', () => {
  expect(typeof Lifx).toBe('function');
});

describe('API', () => {
  let lifx = new Lifx();

  it('should be a class', () => {
    expect(lifx).toBeInstanceOf(Lifx);
  });

  it('should have ".init()" property', () => {
    expect(typeof lifx.init).toBe('function');
  });

  describe('Without Initialization', () => {

    const getWarningMessage = prop => (
      `Call init() first to use "${prop}".`
    );

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

});