# redux-history-sync

Essentially, this module syncs **browser** history locations with a [Redux](https://github.com/rackt/redux) store. If you are looking to read and write changes to the address bar via Redux this might be for you.

This module is intended to be the **only** module in your app that manages or touches window.history. If you want integration with `react-router` look elsewhere. Currently _not_ using the `history` package. Open an issue if you want.

## Routes / Routing / Router

The address bar is a form input. It does not represent overall state. At its best the url can be parsed into an object and be used to populate a tiny portion of application state. This module can be used with [location-info](https://www.npmjs.com/package/location-info) if your need require "routing".

## Install

npm install --save redux-history-sync

## Overall Principals

This library saves each browser history entry to Redux. You can easily read every location a user has visited within the app from Redux. The app is therefor able to render a list of all the "pages" a user has visited from the Redux store. Clicking on one of those pages to navigate to that historical page is the same as selecting it from the browsers history. Doing so will emit the `RESTORE_HISTORY` action type.

If the app developer clicks "Reset" in Redux DevTools the browser history pointer is updated to the location when the app was loaded. If you disable the most current action that resulted in a page change it will move the browser history position back 1. If you navigate around to 6 pages and click "Reset" it is the same as clicking the back button 6 times. Clicking "Reset" and then clicking the browsers back button should exit the app to whatever page the browser visited previously. If browser window loaded the app first the back button will be disabled.

Navigating to a new "page" should act like it. UI state should reset/restore as you navigate to a new page or click back/forward. Filters enabled on one page should probably not carry over to another page. Clicking the browsers back/forward buttons while in the app is actually `RESTORE_HISTORY` not `CREATE_HISTORY`. If the app is going to change the url shown in the address bar it should probably be a new history entry both in the browsers history (via history.pushState) and in Redux. Therefore redux-history-sync provides no action for `replaceState()`. Please open an issue if you need it.

* The browser forward/back/history dropdown should result in a Redux action just like a react button on the page would.
* Changes made to the url by the app should be made via an action.
* Location and related state is saved under a unique key in the store.
* Each history event has location saved to its unique key.
* Reducers can have state specific to a history location. When switching pages previous or new state will be sent to the reducer via the `historySession` reducer. Restore previous state on navigation changes.
* Make browser back/forward navigation and the address bar as controlled as possible.
* Store must have valid initialState set with current location/history information.
* Typical changes to the pathname portion of window.location via Redux action is a `push` event.
* Mirror DevTools changes by moving browser history forward or backward where possible.
* Exchange many API parts for modularity and customization.
* Absolutely no concern over routing/router/routes.
* Avoid any direct usage of the `window` object from within the library. This might change in the future.

## Usage

Example [website](https://redux-history.cape.io) [repo](https://github.com/cape-io/redux-history-example)

Three main things here. `getInitState`, `historyMiddleware`, `syncHistoryWithStore`

```javascript
import {
  getInitState, historyMiddleware, historyReducer, syncHistoryWithStore,
} from 'redux-history-sync'
import { composeWithDevTools } from 'redux-devtools-extension'

/* global window */

const initState = {
  history: getInitState(window.location, window.document.title, window.history),
}
const reducer = {
  history,
}
const store = createStore(
  reducer,
  initState,
  composeWithDevTools( // Can use typical redux compose() function instead.
    applyMiddleware(
      historyMiddleware(window.history),
      thunk,
    ),
  )
)
syncHistoryWithStore(store, window)
```

```javascript
import { createHistory } from 'redux-history-sync'

dispatch(createHistory('/some/new/location'))

```

If you need route handling check out [location-info](https://www.npmjs.com/package/location-info)

## API

### Setting Up Initial State

`getInitState(window.location, window.document.title)` Dispatch an initial action on reducer for sane DevTools resets. Seems like as good a time as any to put the initial address bar information into Redux. There might be better ways to do this?

### Middleware

This might not be needed. It's doing something with `HISTORY_HASH_CHANGE` and `history.replaceState()`.

`historyMiddleware(window.history, [selectHistoryState])` Used to update address bar from actions. `window.history` is simply the browsers history object. `selectHistoryState` is a selector used to find where the `historyReducer` was added. By default selectHistoryState assumes the reducer was mounted to `history`.

### Sync

Use this after the store is created to enable browser to dispatch redux actions.
`syncHistoryWithStore(store, window, [selectHistoryState])`

### Actions

* `createHistory(location, title, key = null, pushState = true)` `HISTORY_CREATE` This action should be dispatched when you want a new history entry or wish to change the location in the address bar. Usually the result of an interaction with a UI. Browser refresh and then forward can also create actions with this type.
* `restoreHistory(key, pushState = true)` `HISTORY_RESTORE` This action should be dispatched when you want to exchange state with a previous history. Usually triggered by the browser back/forward buttons but can also be used inside the app to change browser history position.
* `createFromBrowser()` `HISTORY_LEARN` If the user refreshes on a page the app thinks they do not have browser history. Clicking the browser back button will result in this action being triggered.

### Reducer

`historyReducer`

### Discussions & Related Projects

* https://github.com/FormidableLabs/redux-little-router
* https://github.com/faceyspacey/redux-first-router
* https://github.com/rackt/react-router-redux/pull/259
* https://github.com/ezekielchentnik/redux-history/issues/1#issuecomment-181349898
* https://github.com/callum/redux-routing/
