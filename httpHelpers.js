const url = require('url');

module.exports = {
  urlPathOf: (request) => url.parse(request.url).pathname,
  urlMethod: (request) => request.method,
  getParamsId: (request) => request.url.split('/')[2],

  respondWith200OkText: (response, textBody) => {
    response.writeHead(200, {
      'Content-Type': 'text/plain',
    });
    response.end(textBody);
  },

  respondWith200OkJson: (response, message, jsonBody) => {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    const obj = {
      status: true,
      message: message,
      data: jsonBody,
      status_code: '00',
    };
    response.end(JSON.stringify(obj));
  },

  respondWith404NotFound: (response) => {
    response.writeHead(404);
    response.write('404');
    response.end();
  },

  respondWith400BadRequest: (response) => {
    response.writeHead(400);
    response.end();
  },
};
