# CHANGELOG.md

## 1.0.1 (unreleased)

Features:

  - Introduce unit tests.
  - Introduce integration tests.

Fix:

  - Properly handle case when `lifx.color` gets called with `hex` or `rbg` parameters.

Improvements:

  - Remove not needed `async` - `await` from *LifxGet*, *LifxPower*, *LifxColor* & *LifxScene* component functions.

## 1.0.0 (2020-04-01) - First Release!

Features:

  - Introduce `Lifx` class which provides an easy API for accessing LIFX HTTP API given a valid APP_TOKEN.