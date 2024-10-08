const express = require("express");
const morgan = require("morgan");
const requestId = require("request-id/express");

const logger = require("./config/logger");

const api = require("./api/v1");

// Init app
const app = express();

// Setup middleware
app.use(requestId());
app.use(logger.requests);
app.use(
  morgan("combined", { stream: { write: (message) => logger.info(message) } })
);

app.use("/api", api);
app.use("/api/v1", api);

// No route found handler
app.use((req, res, next) => {
  next({
    message: "Route not found",
    statusCode: 404,
    level: "warn",
  });
});

//Error handler
app.use((err, req, res, next) => {
  const { message, statusCode = 500, level = "error" } = err;
  logger.level;

  res.status(statusCode);
  res.json({ message });
});

module.exports = app;
