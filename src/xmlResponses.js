// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const respondXML = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXMLMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'text/xml' });
  response.end();
};
const success = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: This is a successful response!</message>`;
  responseXML = `${responseXML} <id>ID: success</id>`;
  responseXML = `${responseXML} </response>`;
  respondXML(request, response, 200, responseXML);
  return respondXMLMeta(request, response, 200);
};

const badRequest = (request, response, params) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: This request has the required parameters!</message>`;
  responseXML = `${responseXML} <id>ID: badRequest</id>`;
  responseXML = `${responseXML} </response>`;
  if (!params.valid || params.valid !== true) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Message: Missing valid query parameter set equal to true.</message>`;
    responseXML = `${responseXML} <id>ID: badRequest</id>`;
    responseXML = `${responseXML} </response>`;
    respondXML(request, response, 400, responseXML);
    return respondXMLMeta(request, response, 400);
  }

  respondXML(request, response, 200, responseXML);
  return respondXMLMeta(request, response, 200);
};

const unauthorized = (request, response, params) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: This request has the required loggedIn query parameter.</message>`;
  responseXML = `${responseXML} <id>ID: unauthorized</id>`;
  responseXML = `${responseXML} </response>`;
  if (!params.valid || params.valid !== true) {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Message: Missing loggedIn query parameter set to yes.</message>`;
    responseXML = `${responseXML} <id>ID: unauthorized</id>`;
    responseXML = `${responseXML} </response>`;
    respondXML(request, response, 401, responseXML);
    return respondXMLMeta(request, response, 401);
  }

  respondXML(request, response, 200, responseXML);
  return respondXMLMeta(request, response, 200);
};

const forbidden = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: You do not have access to this content.</message>`;
  responseXML = `${responseXML} <id>ID: forbidden</id>`;
  responseXML = `${responseXML} </response>`;

  respondXML(request, response, 403, responseXML);
  return respondXMLMeta(request, response, 403);
};

const internal = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: Internal Server Error. Something went wrong.</message>`;
  responseXML = `${responseXML} <id>ID: internalError</id>`;
  responseXML = `${responseXML} </response>`;

  respondXML(request, response, 500, responseXML);
  return respondXMLMeta(request, response, 500);
};

const notImplemented = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: A get request for this page has not been implemented yet. Check again later for updated content.</message>`;
  responseXML = `${responseXML} <id>ID: notImplemented</id>`;
  responseXML = `${responseXML} </response>`;
  respondXML(request, response, 501, responseXML);
  return respondXMLMeta(request, response, 501);
};

const notFound = (request, response) => {
  let responseXML = '<response>';
  responseXML = `${responseXML} <message>Message: The page you are looking for was not found.</message>`;
  responseXML = `${responseXML} <id>ID: notFound</id>`;
  responseXML = `${responseXML} </response>`;
  respondXML(request, response, 404, responseXML);
  return respondXMLMeta(request, response, 404);
};

module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
};
