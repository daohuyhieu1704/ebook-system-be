require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: `mongodb+srv://${process.env.PRO_DB_USERNAME}:${process.env.PRO_DB_PW}@hieudh1704-cluster.wcv6dso.mongodb.net/?retryWrites=true&w=majority`,
    name: "dbProd",
  },
};

// const URI =
//   "mongodb+srv://admin:zJMbgYZuEKVnO85l@hieudh1704-cluster.wcv6dso.mongodb.net/?retryWrites=true&w=majority";

const prod = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: `mongodb+srv://${process.env.PRO_DB_USERNAME}:${process.env.PRO_DB_PW}@hieudh1704-cluster.wcv6dso.mongodb.net/?retryWrites=true&w=majority`,
    name: "dbProd",
  },
};

const config = { dev, prod };

const env = process.env.NODE_ENV || "dev";
module.exports = config[env];
