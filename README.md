# redux-history-sync

Essentially, this module syncs **browser** history locations with a [Redux](https://github.com/rackt/redux) store. If you are looking to read and write changes to the address bar via Redux this might be for you.

This module is intended to be the **only** module in your app that manages or touches window.history.

So far the module is a result of a few hours of passionate programming. I'm giving it a 1.0 because it's used in production. But really it's alpha quality. I will give it full version bumps with breaking API changes. Also notice the missing test directory! :-x

## Install

npm install --save redux-history-sync

## Overall Principals

Navigating to a new "page" should act like it. UI state should reset/restore as you navigate to a new page or click back/forward. Filters enabled on one page should probably not carry over to another page. Clicking the browsers back/forward buttons while in the app is actually `RESTORE_HISTORY` not `CREATE_HISTORY`. Also, I feel like if the app is going to change the url shown in the address bar it should probably be a new history entry both in the browsers history (via history.pushState) and in Redux. Therefor this library provides to action to call `replaceState`. Please open an issue if you need it.

This library saves each browser history entry to Redux. You can easily read every location a user has visited within the app from Redux. The app is therefor able to render a list of all the "pages" a user has visited from the Redux store. Clicking on one of those pages to navigate to that historical page is same way selecting it from the browsers history. It should emit the `RESTORE_HISTORY` action type.

If the app developer clicks "Reset" in Redux DevTools the browser history pointer is updated to the location when the app was loaded. If you disable the most current action that resulted in a page change it will move the browser history position back 1. If you navigate around to 6 pages and click "Reset" it is the same as clicking the back button 6 times. Clicking "Reset" and then clicking the browsers back button should exit the app to whatever page the browser visited previously. If browser window loaded the app first the back button will be disabled.

* The browser forward/back/history dropdown should result in a Redux action just like react button on the page would.
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

This module is not intended to work with `react-router` or `history`. If you want integration with `react-router` look at `react-router-redux`.

## API

Currently the best documentation is reading the source and looking at the example.

### Action types

* `HISTORY_CREATE`: Usually the result of an interaction with a UI. Browser refresh and then forward can also create actions with this type.
* `HISTORY_RESTORE`: Usually browser back/forward but can also be used inside the app to change browser history position.

### Actions

* `createHistory`: `create(location, title, key = null, pushState = true)` This action should be dispatched when you want a new history entry.
* `restoreHistory`: `restore(key, pushState = true)` This action should be dispatched when you want to exchange state with a previous history.

### Components

`<Link />`

### Possible hacks

* `const historyCache = createHistoryCache()` In memory history state persistence. Creates an object with two methods. `getKeyStore` and `saveKeyStore`. It's used to save a full store.getState() snapshot for each history/location.
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

### Discussions

Just a copy from

https://github.com/ezekielchentnik/redux-history/issues/1#issuecomment-181349898

I've used react-router since it began but I now realize a URL is a serialized state slice (at best), more than it is a "route". I'd like for a URL to have the ability to completely restore the state of an application, not just a slice of it. Something like example.com/puppies-adorably-confused-by-rainbow/#xsu7 tells the user what's on the page and tells the app to fetch the state value associated with the xsu7 hash and restore its contents/position. In the beginning the only "state" on a webpage was its scroll position. The hash enabled navigating to specific location on the page. I see the hash as an opportunity to do to app state what bit.ly did to urls. That's a tangent for another day.

I tried so hard to like react-router-redux but the library’s primary goal is supporting React Router workflows rather than vanilla history so I decided to part ways.

Initially I thought it best to integrate with the history module but came to realize that I don't really need or want it. I don't want to observe history as much as I want to control it. The history module offers me little over window.history.

Basically, I wanted navigating to a new "page" to act like it. I want UI state to reset/restore as I navigate to a new page or click back/forward. I usually don't want the filters I enabled on one page to carry over to another page. Clicking the browsers back/forward buttons while in the app is actually RESTORE_HISTORY not CREATE_HISTORY. Also, I feel like if the app is going to change the url shown in the address bar it should probably be a new history entry both in the browsers history (via history.pushState) and in Redux.

I also want browser history represented in redux. Basically Redux should keep track of the "pages" visited and what the state at each of those pages is. I want the app to understand where the user is, and where they have been. I want to be able to render a list of all the "pages" a user has visited from the Redux store. I want clicking on one of those pages to navigate to that page the same way selecting it from the browsers history dropdown would. If I click "reset" in Redux DevTools I want it to send my browser back to where I started. DevTools is about time travel after all. If I have navigated around to 6 pages and click "Reset" I want it to be the same as clicking my back button 6 times. After clicking "reset" proceeding to click the browsers back button should exit the app to whatever page I was on previously.
