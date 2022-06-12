import { HttpError } from '../utils/httpError';
import logger from '../utils/logger';
import { HttpPathAuthNotRequire } from './httpPathHelper';

export const auth = () => ({
  before: async (handler, next) => {
    const pathObj = HttpPathAuthNotRequire[handler.event.path] || HttpPathAuthNotRequire[handler.event.resource];
    if (pathObj && pathObj.method.indexOf(handler.event.httpMethod) > -1) return next();
    const { headers } = handler.event;
    try {
      logger.info(headers.Authorization);
      // Add verify logic here
      // Add user to handler.event.user
    } catch (err) {
      throw new HttpError().Unauthorized();
    }
    if (handler.event.user) {
      logger.info(`LoggedIn User -> ${JSON.stringify(handler.event.user)}`);
    }
    return next();
  },
  onError: (_, next) => {
    return next();
  },
});
