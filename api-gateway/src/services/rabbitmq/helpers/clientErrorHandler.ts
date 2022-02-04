export const clientErrorHandler = (error: {
  statusCode: number;
  message: any;
  details: any;
}) => {
  const errorObject = {
    statusCode: error.statusCode,
  };
  switch (error.statusCode) {
    case 400:
      return {
        ...errorObject,
        error: "Bad Request",
        message:
          error.message || `The request doens't meet the required validation`,
        details: error.details || [],
      };
    case 401:
      return {
        ...errorObject,
        error: "Unauthorized",
        message:
          error.message || `You are not authorized to access this resource`,
        details: error.details || [],
      };
    case 403:
      return {
        ...errorObject,
        error: "Forbidden",
        message:
          error.message ||
          `You do not have permissions to access this resource`,
        details: error.details || [],
      };
    case 404:
      return {
        ...errorObject,
        error: "Not found",
        message: error.message || `The requested resource is not found`,
        details: error.details || [],
      };
    case 405:
      return {
        ...errorObject,
        error: "Method not allowed",
        message: error.message || `The requested method is not allowed`,
        details: error.details || [],
      };
    case 500:
      return {
        ...errorObject,
        error: "Internal server error",
        message: error.message || `An error occured on the server`,
        details: error.details || [],
      };
    case 502:
      return {
        ...errorObject,
        error: "Bad Gateway",
        details: error.details || [],
        message:
          error.message ||
          "The server received an invalid response from the upstream server",
      };
    case 503:
      return {
        ...errorObject,
        error: "Service Unavailable",
        message: error.message || "The server is currently unavailable",
        details: error.details || [],
      };
    default:
      return {
        ...errorObject,
        error: "Something went wrong",
        message: `We have no idea yet how this happened but we are looking into it!`,
        details: error.details || [],
      };
  }
};
