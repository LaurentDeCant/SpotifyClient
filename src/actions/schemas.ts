import { schema } from "normalizr";

const Category = new schema.Entity("categories");

const Categories = new schema.Object({
  categories: { items: [Category] }
});

const Artist = new schema.Entity("artists");

const Artists = new schema.Object({
  artists: [Artist]
});

const Album = new schema.Entity(
  "albums",
  {
    artists: [Artist]
  },
  {
    processStrategy: ({ tracks, ...rest }) => ({
      ...rest,
      tracks: tracks ? tracks.items : []
    })
  }
);

const Albums = new schema.Object({
  items: [Album],
  albums: { items: [Album] }
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

const Playlist = new schema.Entity(
  "playlists",
  {
    tracks: [Track]
  },
  {
    processStrategy: ({ tracks, ...rest }) => ({
      ...rest,
      tracks: tracks.items ? tracks.items.map((item: any) => item.track) : []
    })
  }
);

const Playlists = new schema.Entity("playlistItems", {
  playlists: { items: [Playlist] }
});

const Results = new schema.Entity(
  "results",
  {
    albums: [Album],
    artists: [Artist],
    playlists: [Playlist]
  },
  {
    processStrategy: ({ albums, artists, playlists }) => ({
      albums: albums.items,
      artists: artists.items,
      playlists: playlists.items
    })
  }
);

Artist.define({
  albums: [Album],
  relatedArtists: [Artist],
  topTracks: [Track]
});

Album.define({
  tracks: [Track]
});

export const Schemas = {
  Artist,
  Artists,
  Album,
  Albums,
  Category,
  Categories,
  Track,
  Tracks,
  Playlist,
  Playlists,
  Results
};
