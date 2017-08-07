## [3.2.1]

* `HISTORY_LEARN` was incorrectly running removeForwardItems(). That is only for newly created history.

## [3.1.0]

* `selectPrevious()` will select previous history entry or return null.
* `findDifferentPage(findFunc)`

## [3.0.1]

* Update packages.

## [3.0.0]

* Split out link component.

## [2.0.1]

* Fixed some issues with going back in history.

## [2.0.0]

* Removed `makeHydratable()` in favor of `historySession()` reducer.
* Removed historyCache in favor of putting everything in redux.

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
