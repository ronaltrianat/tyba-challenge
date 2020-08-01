module.exports = function configSetup() {
  return {
    server: {
      port: 3000,
    },
    db: {
      connectionString:
        process.env.MONGO_URL || "mongodb://localhost:27017/tyba_challenge_db",
      options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
    },
    jwt: {
      secretKey: "D3s4rr0ll0.2020.*",
      expiration: 1440,
    },
  };
};
