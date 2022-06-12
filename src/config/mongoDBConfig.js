export const dbOpts = {
  databaseURI: process.env.DATABASE_URI || 'mongodb://localhost:27017/airasia',
  connectionOpts: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
