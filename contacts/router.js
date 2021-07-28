const {
  urlPathOf,
  urlMethod,
  respondWith404NotFound,
} = require('../httpHelpers');
const { getContacts, getContactById, deleteContacts } = require('./controller');

function handle(request, response) {
  const uriPath = urlPathOf(request).split('/');
  const method = urlMethod(request);
  const id = uriPath[2];

  if (method === 'GET' && id) {
    return getContactById(request, response);
  } else if (method === 'GET' && !id) {
    return getContacts(request, response);
  } else if (method === 'DELETE') {
    return deleteContacts(request, response);
  } else {
    return respondWith404NotFound(response);
  }
}

module.exports = {
  handle,
};
