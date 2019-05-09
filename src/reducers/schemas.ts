import { schema } from "normalizr";

const album = new schema.Entity("albums");

const artist = new schema.Entity("artists", {
  albums: [album]
});

const playlist = new schema.Entity("playlists");

const track = new schema.Entity("tracks", {
  album: album,
  artists: [artist]
});

album.define({
  artists: [artist],
  tracks: [track]
});

artist.define({
  relatedArtists: [artist],
  topTracks: [track]
});

playlist.define({
  tracks: [track]
});

export const schemas = { album, artist, playlist, track };
