const app = require("./src/app");

const PORT = process.env.PORT || 3055;

const server = app.listen(PORT, () => {
  console.log("Server is running.");
});

server.setTimeout(0);

require("dotenv").config();

// Ctrl+C to stop the server
process.on("SIGINT", () => {
  server.close(() => console.log("Server has been stopped."));
});
