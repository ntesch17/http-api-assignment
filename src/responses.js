// Note this object is purely in memory
// When node shuts down this will be cleared.
// Same when your heroku app shuts down from inactivity
// We will be working with databases in the next few weeks.
const respondJSON = (request, response, status, object, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const respondJSONMeta = (request, response, status, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.end();
};
const success = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: This is a successful response',
    id: 'ID: Success',

  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 200, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 200, 'text/xml');
  }

  const res = JSON.stringify(responseJSON);
  respondJSON(request, response, 200, res, 'application/json');
  return respondJSONMeta(request, response, 200, 'application/json');
};

const badRequest = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: This request has the required parameters',
    id: 'ID: badRequest',
  };
  const res = JSON.stringify(responseJSON);

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 200, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 200, 'text/xml');
  }

  if (!params.valid || params.valid !== 'true') {
    const response1 = {
      message: 'Message: Missing valid query parameter set equal to true.',
      id: 'ID: badRequest',
    };

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${response1.message}</message>`;
      responseXML = `${responseXML} <id>${response1.id}</id>`;
      responseXML = `${responseXML} </response>`;
      respondJSON(request, response, 400, responseXML, 'text/xml');
      return respondJSONMeta(request, response, 400, 'text/xml');
    }
    const res2 = JSON.stringify(response1);
    respondJSON(request, response, 400, res2, 'application/json');
    return respondJSONMeta(request, response, 200, 'application/json');
  }

  respondJSON(request, response, 200, res, 'application/json');
  return respondJSONMeta(request, response, 200, 'application/json');
};

const unauthorized = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: This request has the required loggedIn query parameter.',
    id: 'ID: unauthorized',
  };

  const res = JSON.stringify(responseJSON);

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 200, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 200, 'text/xml');
  }
  if (!params.loggedIn || params.loggedIn !== 'yes') {
    const response1 = {
      message: 'Message: Missing loggedIn query parameter set to yes.',
      id: 'ID: unauthorized',
    };
    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${response1.message}</message>`;
      responseXML = `${responseXML} <id>${response1.id}</id>`;
      responseXML = `${responseXML} </response>`;
      respondJSON(request, response, 401, responseXML, 'text/xml');
      return respondJSONMeta(request, response, 401, 'text/xml');
    }
    const res2 = JSON.stringify(response1);
    respondJSON(request, response, 200, res2, 'application/json');
    return respondJSONMeta(request, response, 200, 'application/json');
  }

  respondJSON(request, response, 200, res, 'application/json');
  return respondJSONMeta(request, response, 200, 'application/json');
};

const forbidden = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: You do not have access to this content.',
    id: 'ID: forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 403, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 403, 'text/xml');
  }
  const res = JSON.stringify(responseJSON);
  respondJSON(request, response, 403, res, 'application/json');
  return respondJSONMeta(request, response, 403, 'application/json');
};

const internal = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: Internal Server Error. Something went wrong.',
    id: 'ID: internalError',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 500, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 500, 'text/xml');
  }

  const res = JSON.stringify(responseJSON);
  respondJSON(request, response, 500, res, 'application/json');
  return respondJSONMeta(request, response, 500, 'application/json');
};

const notImplemented = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'ID: notImplemented',
  };
  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 501, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 501, 'text/xml');
  }

  const res = JSON.stringify(responseJSON);
  respondJSON(request, response, 501, res, 'application/json');
  return respondJSONMeta(request, response, 501, 'application/json');
};

const notFound = (request, response, params, acceptedTypes) => {
  const responseJSON = {
    message: 'Message: The page you are looking for was not found.',
    id: 'ID: notFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.id}</id>`;
    responseXML = `${responseXML} </response>`;

    respondJSON(request, response, 404, responseXML, 'text/xml');
    return respondJSONMeta(request, response, 404, 'text/xml');
  }

  const res = JSON.stringify(responseJSON);
  respondJSON(request, response, 404, res, 'application/json');
  return respondJSONMeta(request, response, 404, 'application/json');
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
