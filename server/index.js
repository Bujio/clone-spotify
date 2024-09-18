const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => res.json({ messaje: "Hello desde server!!" }));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

module.exports = app;
