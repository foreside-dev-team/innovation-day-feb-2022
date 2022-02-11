export const queueErrorHandler = (error: any) => {
  console.log("queueErrorHandler: ", error);
  error = error.toString();
  const errorObject = {
    name: "Queue Error",
  };
  switch (error) {
    case "TypeError: content is not a buffer":
      return {
        ...errorObject,
        details: [
          {
            message: "Queue Error",
            code: "101",
            error: error.toString(),
          },
        ],
        message: `An error occured in the queue`,
        statusCode: 500,
      };
      break;
    default:
      return {
        ...errorObject,
        details: [
          {
            message: "Unknow Queue Error",
            code: "999",
            error: error.toString(),
          },
        ],
        message: `An unknown error occured in the queue`,
        statusCode: 500,
      };
  }
};
