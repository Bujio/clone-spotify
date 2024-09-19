const SpotifyWebApi = require("spotify-web-api-node");
require("dotenv").config();

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

const user = process.env.USER_SPOTIFY;

spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.error("Something went wrong when retrieving an access token", error)
  );

module.exports.getAllPlaylistsOfUser = async (req, res, next) => {
  try {
    const data = await spotifyApi.getUserPlaylists(user);
    const playlists = data.body;
    return res.status(200).json(playlists);
  } catch (error) {
    next(error);
  }
};

module.exports.getArtistAlbums = async (req, res, next) => {
  try {
    const artist = await spotifyApi.getArtistAlbums("43ZHCT0cAZBISjO8DG9PnE");
    const artistAlbums = artist.body.items;
    const info = artistAlbums.map((item) => {
      const { available_markets, ...rest } = item; // Excludes available_markets
      return rest;
    });

    res.json(info);
  } catch (error) {
    next(error);
  }
};
