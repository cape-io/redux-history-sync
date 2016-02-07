# redux-history-sync

Essentially, this module syncs browser history locations with a Redux store. If you are looking to read and write changes to the address bar via Redux this might be for you.

This module is not intended to work with `react-router` or `history`.

So far the module is a result of a few hours of passionate programming. I'm giving it a 1.0 because it's used in production. But really it's alpha quality. I will give it full version bumps with breaking API changes.

## Overall Principals

* The browser forward/back buttons should result in Redux actions just like buttons on the page would.
* This is the only module in your app to manage window.history integration.
* Changes made to the url should be made via an action.
* Each history event gets a unique key.
* Location and related state is saved under a unique key in the store.
* Default behavior when switching pages should mimic page reloads. UI state resets.
* Store must have valid initialState set with current location/history information.
* Make browser back/forward navigation and the address bar as controlled as possible.
* Restore previous state on navigation changes.
* Typical changes to the pathname portion of window.location via Redux action is a `push` event.
* Mirror DevTools changes by moving browser history forward or backward where possible.
* Exchange many API parts for modularity and customization.
* Absolutely no concern over routing/router/routes.
* Avoid any direct usage of `window` object from within the library. This might change in the future.

## Not for you?

* If you want integration with react-router look at react-router-redux.

## API

Currently the best documentation is reading the source and looking at the example.

### Action types

* `HISTORY_CREATE`: Usually the result of an interaction with a UI. Browser refresh and then forward can also create actions with this type.
* `HISTORY_RESTORE`: Usually browser back/forward but can also be used inside the app to change browser history position.

### Actions

* `createHistory`: `create(location, title, key, pushState = true)` This action should be dispatched when you want a new history entry.
* `restoreHistory`: `restore(key, pushState = true)` This action should be dispatched when you want to exchange state with a previous history.

### Components

`<Link />`

### Possible hacks

* `const historyCache = createHistoryCache()` In memory history state persistence.
* `getInitState(window.location, window.document.title)` Dispatch initial action on reducer for sane DevTools resets.
* `makeHydratable(reducer)`

### Middleware

`historyMiddleware(window.history, historyCache)`

### Reducer

`historyReducer`

### Reducer Hydratable

`makeHydratable`

### Sync

`syncHistoryWithStore(store, window, historyCache)`

## Routes / Routing / Router

The address bar is a form input. It does not represent overall state. At its best the url can be parsed into an object and be used a tiny portion of application state. The URL is given too much attention.

A complete example will be provided soon on how parse the location object and turn it into useful state using the `location-info` module.
