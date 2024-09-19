const express = require("express");
const morgan = require("morgan");

const logger = require("./config/logger");

const port = process.env.SERVER_PORT || 3000;
const app = express();

app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

app.get("/", (req, res, next) => res.json({ messaje: "Welcome to the API" }));

// No route found handler
app.use((req, res, next) => {
  const message = "Route not found";
  const statusCode = 404;

  logger.warn(message);

  res.status(statusCode);
  res.json({ message });
});

//Error handler
app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;

  logger.error(message);

  res.status(statusCode);
  res.json({ message });
});

module.exports = app;
