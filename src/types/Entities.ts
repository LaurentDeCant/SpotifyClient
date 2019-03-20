import { Album, Artist, Category, Playlist, Track } from ".";

export interface Entities {
  albums: { [id: string]: Album };
  artists: { [id: string]: Artist };
  categories: { [id: string]: Category };
  playlists: { [id: string]: Playlist };
  tracks: { [id: string]: Track };
}
