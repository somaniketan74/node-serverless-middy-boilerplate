import { handlerWrapper } from '../utils/handleWrapper';
import logger from '../utils/logger';
import { createUser, updateUser, getUser } from '../validations/user.validation';
import * as UserService from '../services/users.services';

const post = async (event) => {
  logger.info(event.body);
  // return { data: 'test' };
  const { body } = event;
  const res = await UserService.createUser(body);
  return res;
};

const get = async (event) => {
  logger.info(event.queryStringParameters);
  // return { data: 'test' };
};

const put = async (event) => {
  logger.info(event.pathParameters);
  // throw new HttpError().BadRequest('Bad request');
};
export const createFunc = handlerWrapper(post, createUser);
export const getFunc = handlerWrapper(get, getUser);
export const putFunc = handlerWrapper(put, updateUser);
