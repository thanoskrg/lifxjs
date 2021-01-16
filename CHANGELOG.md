# CHANGELOG

## 1.1.0 (2021-01-16)

Features:

- Add `duration` support when changing color and power state ([#9](https://github.com/thanoskrg/lifxjs/issues/9))

Housekeeping:

- Upgrade outdated yarn dependencies.

## 1.0.1 (2020-04-10)

Fix:

- Properly handle case when `lifx.color` gets called with `hex` or `rbg` parameters.

Improvements:

- Remove not needed `async` - `await` from _LifxGet_, _LifxPower_, _LifxColor_ & _LifxScene_ component functions.

Housekeeping:

- Add unit tests infrastructure.

## 1.0.0 (2020-04-01) - First Release!

Features:

- Introduce `Lifx` class which provides an easy API for accessing LIFX HTTP API given a valid APP_TOKEN.
