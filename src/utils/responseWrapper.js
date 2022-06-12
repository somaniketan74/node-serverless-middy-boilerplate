import httpStatusCodes, { getStatusText } from 'http-status-codes';

export const responseWrapper = (statusCode, error, payload = {}) => ({
  statusCode,
  message: getStatusText(statusCode),
  payload,
  error,
});

export const simpleErrorResponseWrapper = (statusCode) => ({
  statusCode,
  message: getStatusText(statusCode),
});

export const errorResponseWrapper = (error) => ({
  // error goes to handler.response.error to proceed with proxyResponse middleware
  error,
});

export const successfulResponseWrapper = (payload = {}) => {
  const message = getStatusText(httpStatusCodes.OK);

  return {
    statusCode: httpStatusCodes.OK,
    message,
    payload,
  };
};
