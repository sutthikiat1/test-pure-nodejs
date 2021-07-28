const { respondWith404NotFound, urlPathOf } = require('./httpHelpers');
const ping = require('./ping/router');
const contacts = require('./contacts/router');

module.exports = function(request, response) {
  const url = urlPathOf(request).split('/')[1];
  if (url === 'ping') {
    ping.handle(request, response);
  } else if (url === 'contacts') {
    contacts.handle(request, response);
  } else {
    respondWith404NotFound(response);
  }

  // if (routers[0].handle(request, response) !== routerHandleResult.HANDLED) {
  //   respondWith404NotFound(response);
  // }
  // if (routers[1].handle(request, response) !== routerHandleResult.HANDLED) {
  //   respondWith404NotFound(response);
  // }
};
