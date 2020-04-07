const expectLifxGetInterface = lifxGet => {
  expect(typeof lifxGet).toBe('object');
  expect(typeof lifxGet.all).toBe('function');
  expect(typeof lifxGet.light).toBe('function');
  expect(typeof lifxGet.group).toBe('function');
  expect(typeof lifxGet.location).toBe('function');
  expect(typeof lifxGet.scenes).toBe('function');
};

const expectLifxPowerInterface = lifxPower => {
  expect(typeof lifxPower).toBe('object');
  expect(typeof lifxPower.all).toBe('function');
  expect(typeof lifxPower.light).toBe('function');
  expect(typeof lifxPower.group).toBe('function');
  expect(typeof lifxPower.location).toBe('function');
};

const expectLifxColorInterface = lifxColor => {
  expect(typeof lifxColor).toBe('object');
  expect(typeof lifxColor.all).toBe('function');
  expect(typeof lifxColor.light).toBe('function');
  expect(typeof lifxColor.group).toBe('function');
  expect(typeof lifxColor.location).toBe('function');
};

const expectLifxSceneInterface = lifxScene => {
  expect(typeof lifxScene).toBe('object');
  expect(typeof lifxScene.activate).toBe('function');
};

module.exports = {
  expectLifxGetInterface,
  expectLifxPowerInterface,
  expectLifxColorInterface,
  expectLifxSceneInterface
};