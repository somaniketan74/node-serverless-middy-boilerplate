import { combineMiddyFactory } from '../middlewares/middyFactory';
import { execute } from './execute';

export const handlerWrapper = (lambda, validationSchema, shouldConnectDB = true) =>
  combineMiddyFactory(execute(lambda), validationSchema, shouldConnectDB);
