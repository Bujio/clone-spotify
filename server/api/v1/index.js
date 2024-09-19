const router = require("express").Router();

const playlists = require("./playlists/routes");
const users = require("./users/routes");

router.use("/playlists", playlists);
router.use("/users", users);

module.exports = router;
