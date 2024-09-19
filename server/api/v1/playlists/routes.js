const router = require("express").Router();
const playlistsController = require("../controllers/playlists/playlists.Controller");

// Routes
router.get("/", playlistsController.getAllPlaylistsOfUser);
router.get("/artists/:id", playlistsController.getArtistAlbums);

module.exports = router;
