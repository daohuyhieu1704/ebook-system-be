const mongoose = require("mongoose");
const os = require("os");
const process = require("process");
const _SECOND = 5000;

// count connection
const countConnection = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of connections: ${numConnections}`);
};

// check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCpus = mongoose.os.cpus().length;
    const numFree = numCpus - numConnections;
    const percentFree = (numFree / numCpus) * 100;
    const memoryUsage = process.memoryUsage().heapUsed / 1024 / 1024;
    console.log(`Number of connections: ${numConnections}`);
    console.log(`Number of CPUs: ${numCpus}`);
    console.log(`Number of free CPUs: ${numFree}`);
    console.log(`Percent of free CPUs: ${percentFree}`);
    console.log(`Memory usage: ${memoryUsage} MB`);
  }, _SECOND);
};

module.exports = {
  countConnection,
};
