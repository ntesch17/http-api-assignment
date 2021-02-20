const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;
const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getCSS,
  '/success': responseHandler.success,
  '/badRequest': responseHandler.badRequest,
  '/unauthorized': responseHandler.unauthorized,
  '/forbidden': responseHandler.forbidden,
  '/internal': responseHandler.internal,
  '/notImplemented': responseHandler.notImplemented,
  notFound: responseHandler.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const params = query.parse(parsedURL.query);
  const acceptedTypes = request.headers.accept.split(',');
  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, params, acceptedTypes);
  } else {
    urlStruct.notFound(request, response, params, acceptedTypes);
  }
  // console.dir(parsedURL);
  // console.dir(params);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
