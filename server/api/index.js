const router = require("express").Router();

router.route("/playlists").get((req, res, next) => {
  res.json({ message: "GET all playlists" });
});

router.route("/users").get((req, res, next) => {
  res.json({ message: "GET all users" });
});

module.exports = router;
