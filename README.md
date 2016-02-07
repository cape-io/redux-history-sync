# redux-history-sync

## Rules of this module

1. Each history entry gets a unique key.
1. Default behavior when switching pages should mimic page reloads. UI state resets.
1. Store must have valid initialState set with current.
1. Location is saved under a unique key in the store.
1. Make browser back/forward navigation and the address bar as controlled as possible.
1. Restore previous state on navigation changes.
1. Changes to the pathname portion of window.location is a `push` event.
