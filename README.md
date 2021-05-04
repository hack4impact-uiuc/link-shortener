# link-shortener

A simple link shortener for Hack4Impact UIUC links.

## Usage

To add/edit link redirects, edit the `redirects` variable in `api/handler.go`. The map's key corresponds to the alias of the redirect (what users would type in) whereas the value corresponds to the destination (where users would end up).

### Reserved Routes

The following routes are not available to be used as redirects due to their use in application internals:

- `/` - routes to `static/index.html`, corresponds to `h4i.app` homepage
- `/redirects` - provides an API response listing all active redirects
- `/assets/*` - contains assets for use by `static/index.html`
