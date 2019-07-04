import { schema } from "normalizr";

const Album = new schema.Entity(
  "albums",
  {},
  {
    processStrategy: ({ tracks, ...rest }) => ({
      ...rest,
      tracks: tracks ? tracks.items : []
    })
  }
);

const Artist = new schema.Entity("artists");

const Artists = new schema.Object({
  artists: [Artist]
});

const Category = new schema.Entity("categories");

const PagedAlbums = new schema.Object({
  items: [Album],
  albums: { items: [Album] }
});

const PagedArtists = new schema.Object({
  artists: { items: [Artist] }
});

const PagedCategories = new schema.Object({
  categories: { items: [Category] }
});

const PagedPlaylists = new schema.Object({});

const PagedTracks = new schema.Object({});

const Playlist = new schema.Entity(
  "playlists",
  {},
  {
    processStrategy: ({ tracks, ...rest }) => ({
      ...rest,
      tracks: tracks.items ? tracks.items.map((item: any) => item.track) : []
    })
  }
);

const Results = new schema.Entity(
  "results",
  {
    albums: [Album],
    artists: [Artist],
    playlists: [Playlist]
  },
  {
    processStrategy: ({ albums, artists, playlists, tracks }) => ({
      albums: albums.items,
      artists: artists.items,
      playlists: playlists.items,
      tracks: tracks.items
    })
  }
);

const SavedAlbums = new schema.Object({
  //@ts-ignore
  items: [{ album: Album }]
});

const Track = new schema.Entity(
  "tracks",
  {
    album: Album,
    artists: [Artist]
  },
  {
    processStrategy: ({ album, artists, ...rest }, parent) => ({
      ...rest,
      album: parent["type"] === "album" ? parent : album,
      artists: artists
    })
  }
);

const Tracks = new schema.Object({
  tracks: [Track]
});

Album.define({
  artists: [Artist],
  tracks: [Track]
});

Artist.define({
  albums: [Album],
  relatedArtists: [Artist],
  topTracks: [Track]
});

PagedPlaylists.define({
  items: [Playlist],
  playlists: { items: [Playlist] }
});

PagedTracks.define({
  //@ts-ignore
  items: [{ track: Track }]
});

Playlist.define({
  tracks: [Track]
});

Results.define({
  tracks: [Track]
});

export const Schemas = {
  Album,
  Artist,
  Artists,
  Category,
  PagedAlbums,
  PagedArtists,
  PagedCategories,
  PagedPlaylists,
  PagedTracks,
  Playlist,
  Results,
  SavedAlbums,
  Track,
  Tracks
};
