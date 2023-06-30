module.exports = {
    httpStatus: {
      OK: 200, // request treated with success
      CREATED: 201, // request treated with success and document created
      ACCEPTED: 202, // request treated but with no guarantee of result
      NO_CONTENT: 204, // request treated with success but no information to send
      BAD_REQUEST: 400, // the request syntaxe is incorrect
      UNAUTHORIZED: 401, // authentication is necessary to access resource
      FORBIDDEN: 403, // Server understood the request but refuse to execute, even if authenticated will make no diff
      NOT_FOUND: 404, // Resource not found
      INTERNAL_SERVER_ERROR: 500, //internal server error
      NOT_IMPLEMENTED: 501, // fonctionality not supported by server
      SERVICE_UNAVAILABLE: 503, // Service is temporally unavailable
      UNKOWN_ERROR: 520, // generic response when server returns an unexpected result
      NOT_ACCEPTABLE: 406, // impossible to serve a response that meets the defined criteria
    },
    COOKIE_NAME: "auth_cookies_name",
  };