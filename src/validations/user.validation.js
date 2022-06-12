import Joi from 'joi';
import { objectId } from './custom.validation';

// Need to below merge because joi only allow enum like ("","","")
// let val = Joi.string().required();
// Object.values(Roles).forEach((ele) => {
//   val = val.valid(ele);
// });

export const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstName: Joi.string(),
    companyId: Joi.string().required().custom(objectId),
    lastName: Joi.string(),
    profilePic: Joi.string(),
    phone: Joi.string(),
    roleId: Joi.string().required().custom(objectId),
    address: Joi.object(),
    location: Joi.object(),
  }),
};

export const getUser = {
  queryStringParameters: Joi.object().keys({
    name: Joi.string().required(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

export const updateUser = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    profilePic: Joi.string(),
    phone: Joi.string(),
    address: Joi.object(),
    location: Joi.object(),
  }),
  pathParameters: Joi.object().keys({
    id: Joi.string().required().custom(objectId),
  }),
};
