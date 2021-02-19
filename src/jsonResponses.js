// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
  console.log('here');
};
const success = (request, response) => {
  const responseJSON = {
    message: 'Message: This is a successful response',

  };

  respondJSON(request, response, 200, responseJSON);
  return respondJSONMeta(request, response, 200);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'Message: This request has the required parameters',
  };

  if (!params.valid || params.valid !== true) {
    responseJSON.message = 'Message: Missing valid query parameter set equal to true.';
    responseJSON.id = 'badRequest';

    respondJSON(request, response, 400, responseJSON);
    return respondJSONMeta(request, response, 400);
  }

  respondJSON(request, response, 200, responseJSON);
  return respondJSONMeta(request, response, 200);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'Message: This request has the required loggedIn query parameter.',
  };

  if (!params.valid || params.valid !== true) {
    responseJSON.message = 'Message: Missing loggedIn query parameter set to yes.';
    responseJSON.id = 'unauthorized';

    respondJSON(request, response, 401, responseJSON);
    return respondJSONMeta(request, response, 401);
  }

  respondJSON(request, response, 200, responseJSON);
  return respondJSONMeta(request, response, 200);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'Message: You do not have access to this content.',
    id: 'forbidden',
  };

  respondJSON(request, response, 403, responseJSON);
  return respondJSONMeta(request, response, 403);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Message: Internal Server Error. Something went wrong.',
    id: 'internalError',
  };

  respondJSON(request, response, 500, responseJSON);
  return respondJSONMeta(request, response, 500);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'Message: A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };

  respondJSON(request, response, 501, responseJSON);
  return respondJSONMeta(request, response, 501);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'Message: The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
  return respondJSONMeta(request, response, 404);
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
