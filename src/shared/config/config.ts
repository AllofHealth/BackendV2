export default () => ({
  database: {
    mongodb_uri: process.env.MONGODB_URI,
    dbName: 'Pharmalink',
  },
});
