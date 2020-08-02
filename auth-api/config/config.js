module.exports = function configSetup() {
  return {
    server: {
      port: 3000,
    },
    userSession: {
      timeSession: 300, // en segundos
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
    redis: {
      host: "127.0.0.1",
      port: 6379,
    },
    jwt: {
      secretKey: "D3s4rr0ll0.2020.*",
      expiration: "15m", // https://github.com/vercel/ms
    },
  };
};
