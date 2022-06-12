import httpStatusCodes, { getStatusText } from 'http-status-codes';

export class HttpError extends Error {
  constructor() {
    super(getStatusText(httpStatusCodes.INTERNAL_SERVER_ERROR));
    this.statusCode = httpStatusCodes.INTERNAL_SERVER_ERROR;
    this.message = getStatusText(this.statusCode);
    this.payload = {};
  }

  BadRequest(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.BAD_REQUEST, customMessage, customErrorCode, payload);
  }

  Unauthorized(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.UNAUTHORIZED, customMessage, customErrorCode, payload);
  }

  Forbidden(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.FORBIDDEN, customMessage, customErrorCode, payload);
  }

  NotFound(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.NOT_FOUND, customMessage, customErrorCode, payload);
  }

  MethodNotAllowed(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.METHOD_NOT_ALLOWED, customMessage, customErrorCode, payload);
  }

  NotAcceptable(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.NOT_ACCEPTABLE, customMessage, customErrorCode, payload);
  }

  RequestTimeout(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.REQUEST_TIMEOUT, customMessage, customErrorCode, payload);
  }

  Conflict(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.CONFLICT, customMessage, customErrorCode, payload);
  }

  Gone(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.GONE, customMessage, customErrorCode, payload);
  }

  TooManyRequests(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.GONE, customMessage, customErrorCode, payload);
  }

  InternalServerError(customMessage, customErrorCode, payload = {}) {
    return this.createError(httpStatusCodes.GONE, customMessage, customErrorCode, payload);
  }

  createError(statusCode, message, customErrorCode, payload) {
    this.statusCode = statusCode;
    this.message = message || getStatusText(statusCode);
    this.customErrorCode = customErrorCode;
    this.payload = payload;
    return this;
  }
}
