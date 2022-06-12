import httpStatusCodes from 'http-status-codes';
import { headers as importedHeaders } from '../common/headers';
import { HttpError } from '../utils/httpError';
import logger from '../utils/logger';

const { CONTENT_TYPE_TYPES, HEADERS_NAMES } = importedHeaders;
const { APPLICATION_JSON } = CONTENT_TYPE_TYPES;
const { CONTENT_TYPE } = HEADERS_NAMES;
const serverErrorCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
const serverErrorMessage = httpStatusCodes.getStatusText(serverErrorCode);
const isBase64Encoded = false;

/* eslint no-shadow: 0 */
export const proxyResponse = () => ({
  after: (handler, next) => {
    const { headers } = handler.response;

    try {
      const { payload = {}, message = serverErrorMessage, statusCode = serverErrorCode, headers, error } = handler.response;

      if (error && error instanceof HttpError) {
        const { message, payload, statusCode, customErrorCode } = error;

        handler.response = {
          headers: {
            ...headers,
            [CONTENT_TYPE]: APPLICATION_JSON,
          },
          statusCode,
          body: JSON.stringify({
            payload: {
              ...payload,
              customErrorCode,
            },
            message,
          }),
          isBase64Encoded,
        };
        logger.info(`Response -> ${JSON.stringify(`${handler.response.statusCode} - ${handler.response.body}`)}`);
        return next();
      }

      handler.response = {
        headers: {
          ...headers,
          [CONTENT_TYPE]: APPLICATION_JSON,
        },
        statusCode,
        body: JSON.stringify({
          payload,
          message,
        }),
        isBase64Encoded,
      };
      logger.info(`Response -> ${JSON.stringify(payload)}`);
      return next();
    } catch (err) {
      handler.response = {
        headers: {
          ...headers,
          [CONTENT_TYPE]: APPLICATION_JSON,
        },
        statusCode: serverErrorCode,
        body: JSON.stringify({
          payload: {},
          message: serverErrorMessage,
        }),
        isBase64Encoded,
      };
      logger.info(`Response -> ${JSON.stringify(`${serverErrorCode} - ${serverErrorMessage}`)}`);
      return next();
    }
  },
  // on middleware error (e.g. validateInputs), thrown from lambda errors are caught by WithTryCatch(lambda) and returned in handler.response.error
  onError: (handler, next) => {
    const { headers } = handler.response;
    let { error } = handler; // must convert to unknown to force HandlerLambda.error type overwriting
    if (!error) error = new HttpError();

    handler.response = {
      headers: {
        ...headers,
        [CONTENT_TYPE]: APPLICATION_JSON,
      },
      statusCode: error.statusCode || serverErrorCode,
      body: JSON.stringify({
        payload: error.payload || {},
        message: error.message || serverErrorMessage,
      }),
      isBase64Encoded,
    };
    logger.info(`Response -> ${JSON.stringify(`${handler.response.statusCode} - ${handler.response.body}`)}`);

    return next();
  },
});
