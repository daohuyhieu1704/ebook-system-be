import app from "./src/app.js";

const PORT = process.env.DB_PORT || 8000;

const server = app.listen(PORT, () => {
  console.log("Server is running.");
});

// Ctrl+C to stop the server
process.on("SIGINT", () => {
  server.close(() => console.log("Server has been stopped."));
});
