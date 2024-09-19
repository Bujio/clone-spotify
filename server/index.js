const express = require("express");
const morgan = require("morgan");
const requestId = require("request-id/express");

const logger = require("./config/logger");

// Init app
const app = express();

// Setup middleware
app.use(requestId());
app.use(logger.requests);
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

app.get("/", (req, res, next) =>
  res.json({ id: req.id, messaje: "Welcome to the API" })
);

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
