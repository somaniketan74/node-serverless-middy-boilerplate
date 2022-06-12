import { UserModel } from '../models';

export const createUser = async (data) => {
  // Need to change
  data.uid = new Date().getTime();
  const userObj = new UserModel(data);
  const user = await userObj.save();
  return user;
};

export const getUserByField = async (field, value, populate = null, selectedFields = {}) => {
  const options = {};
  if (populate) {
    options.populate = populate;
  }
  const user = await UserModel.findOne({ [field]: value }, selectedFields, options);
  return user;
};

export const updateUserById = async (value, data) => {
  const user = await UserModel.findOneAndUpdate(
    { _id: value },
    {
      $set: data,
    },
    { new: true }
  );
  return user;
};

export const deleteUserById = async (id) => {
  const user = await UserModel.delete({ _id: id });
  return user;
};

export const getAllUser = async (input, populate = null, selectedFields = {}) => {
  const { page, limit, sortBy, order, _ids, name, email } = input;
  const query = {};
  if (_ids) {
    query._id = { $in: _ids };
  }
  if (name) {
    query.$or = [{ firstName: { $regex: name } }, { lastName: { $regex: name } }];
  }
  if (email) {
    query.email = { $regex: email };
  }
  const options = {
    page: page || 1,
    limit: limit || 10,
    select: selectedFields,
  };
  if (populate) {
    options.populate = populate;
  }
  if (sortBy) {
    options.sort = {
      [sortBy]: order || 1,
    };
  }
  const users = await UserModel.paginate(query, options);
  return users;
};
