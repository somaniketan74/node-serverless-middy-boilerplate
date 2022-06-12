import Joi from 'joi';
import { HttpError } from '../utils/httpError';
// import { getUser } from '../validations/user.validation';
import { pick } from '../utils/pick';

export const validateInput = (validationSchema) => ({
  before: (handler, next) => {
    const validSchema = pick(validationSchema, ['body', 'queryStringParameters', 'pathParameters']);
    const object = pick(handler.event, Object.keys(validSchema));
    const { error } = Joi.compile(validSchema)
      .prefs({ errors: { label: 'key' }, abortEarly: false })
      .validate(object);

    if (error) {
      const errorMessage = error.details.map((details) => details.message).join(', ');
      throw new HttpError().BadRequest(undefined, undefined, errorMessage);
    }
    return next();
  },
  onError: (_, next) => {
    return next();
  },
});
