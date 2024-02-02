const mysql = require("mysql");
const os = require("os");

const _SECOND = 5000;
const connectionConfig = require("../configs/config.mysqldb");

const connection = mysql.createConnection(connectionConfig);

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL!");
});

process.on("SIGINT", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing MySQL connection:", err);
    }
    console.log("MySQL connection closed.");
    process.exit(0);
  });
});

// Count connection
const countConnection = () => {
  connection.query(
    "SHOW STATUS WHERE `variable_name` = 'Threads_connected'",
    (err, results) => {
      if (err) {
        console.error("Error querying Threads_connected:", err);
        return;
      }
      console.log("Number of active connections:", results[0].Value);

      connection.query(
        "SHOW VARIABLES LIKE 'max_connections'",
        (err, results) => {
          if (err) {
            console.error("Error querying max_connections:", err);
            return;
          }
          console.log("Maximum allowed connections:", results[0].Value);
        }
      );
    }
  );
};

// Check overload
const checkOverload = () => {
  setInterval(() => {
    countConnection();

    const numCpus = os.cpus().length;
    const freeMemory = os.freemem() / 1024 / 1024;
    const totalMemory = os.totalmem() / 1024 / 1024;
    const memoryUsage = (totalMemory - freeMemory).toFixed(2);
    const percentFreeMemory = ((freeMemory / totalMemory) * 100).toFixed(2);

    console.log(`Number of CPUs: ${numCpus}`);
    console.log(`Memory usage: ${memoryUsage} MB`);
    console.log(`Free memory: ${freeMemory.toFixed(2)} MB`);
    console.log(`Percent of free memory: ${percentFreeMemory}`);
  }, _SECOND);
};

module.exports = {
  countConnection,
  checkOverload,
};
