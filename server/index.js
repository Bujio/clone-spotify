const express = require("express");
const port = process.env.SERVER_PORT || 3000;
const app = express();

app.get("/", (req, res, next) => res.json({ messaje: "Welcome to the API" }));

// No route found handler
app.use((req, res, next) => {
  res.status(404);
  res.json({ message: "Error. Route not found" });
});

//Error handler
app.use((error, req, res, next) => {
  const { statusCode = 500, message } = error;
  res.statusCode;
  res.json({ message });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
