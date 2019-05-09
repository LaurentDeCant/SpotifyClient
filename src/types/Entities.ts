import {
  NormalizedAlbum,
  NormalizedArtist,
  Category,
  NormalizedPlaylist,
  NormalizedTrack
} from ".";

export interface Entities {
  albums: { [id: string]: NormalizedAlbum };
  artists: { [id: string]: NormalizedArtist };
  categories: { [id: string]: Category };
  playlists: { [id: string]: NormalizedPlaylist };
  tracks: { [id: string]: NormalizedTrack };
  results: {
    [id: string]: {
      albums: NormalizedAlbum[];
      artists: NormalizedArtist[];
      playlists: NormalizedPlaylist[];
    };
  };
}
