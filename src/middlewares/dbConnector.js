import mongoose from 'mongoose';
import { dbOpts } from '../config/mongoDBConfig';

export const dbConnector = () => ({
  before: async (handler, next) => {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(dbOpts.databaseURI, dbOpts.connectionOpts);
    }
    next();
  },
  after: async (handler, next) => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    next();
  },
});
