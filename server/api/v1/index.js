const router = require("express").Router();

router.route("/playlists").get((req, res, next) => {
  res.json({ message: "GET all task" });
});

module.exports = router;
