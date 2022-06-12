import { successfulResponseWrapper, errorResponseWrapper } from './responseWrapper';
import { HttpError } from './httpError';

export const execute = (lambdaLogic) => async (event) => {
  try {
    const result = await lambdaLogic(event);
    return successfulResponseWrapper(result);
  } catch (err) {
    if (err instanceof HttpError) {
      return errorResponseWrapper(err);
    }

    const httpError = new HttpError();

    return errorResponseWrapper(httpError);
  }
};
