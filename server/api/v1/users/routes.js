const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ message: "GET all users" });
});

module.exports = router;
