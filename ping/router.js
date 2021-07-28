const { getPings, getPingById } = require('./controller');
const {
  urlPathOf,
  urlMethod,
  respondWith404NotFound,
} = require('../httpHelpers');

function handle(request, response) {
  const uriPath = urlPathOf(request).split('/');
  const method = urlMethod(request);
  const id = uriPath[2];

  if (method === 'GET' && !id) {
    return getPings(request, response);
  } else {
    return respondWith404NotFound(response);
  }

  // if (urlPathOf(request).startsWith('/ping')) {
  //   if (urlPathOf(request) !== '/ping') {
  //     return routerHandleResult.NO_URL_PATH_MATCH;
  //   }
  //   if (request.method !== 'GET') {
  //     return routerHandleResult.NO_HTTP_METHOD_MATCH;
  //   }
  //   respondWith200OkJson(response, 'pong');
  //   return routerHandleResult.HANDLED;
  // } else {
  //   return routerHandleResult.NO_URL_PATH_MATCH;
  // }
}

module.exports = {
  handle,
};
