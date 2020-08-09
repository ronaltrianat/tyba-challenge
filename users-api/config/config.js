module.exports = function configSetup() {
  return {
    server: {
      port: 3001,
    },
    mongodb: {
      connectionString:
        process.env.MONGO_URL || "mongodb://localhost:27017/tyba_challenge_db",
      options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    },
  };
};
