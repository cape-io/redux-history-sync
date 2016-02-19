## [1.4.0]

* Update `lodash` to 4.5.
* `getLocationObject` no longer takes defaults. Defaults are applied within the `create` action.

## [1.3.0]

The `Link` component will call onClick function if passed in props.

## [1.2.0]
> 2016-02-13

The `Link` component now parses a location object from a `to` or `href` string in props using `document.createElement('a')` on click. Components can send `pathname`, `search`, `hash` props instead of `href`.

## [1.1.2]

Using `payload.location` inside reducer instead of a spread on payload. Global location object was being saved instead.

## [1.1.1]

Return `state` in reducer early if no `action.payload`.

## [1.1.0]

Upgraded lodash dependency from 4.2.1 to 4.3.0.

## [1.0.3]

Added `selectActiveKeyDefault()` to public API. This is all it does `selectActiveKey(selectHistoryState(state))`.

## [1.0.1]
> 2016-02-08

Improved `locationSerialize` to accept undefined values.

## [1.0.0]
> 2016-02-07

Initial Release
