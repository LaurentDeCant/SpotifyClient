import { Album, Artist, Playlist, Track, Type } from "../types";

interface Dictionary<T> {
  [key: string]: T;
}

export interface AlbumDictionary extends Dictionary<Album> {}
export interface ArtistDictionary extends Dictionary<Artist> {}
export interface PlaylistDictionary extends Dictionary<Playlist> {}
export interface TrackDictionary extends Dictionary<Track> {}

export interface Collection {
  id: string;
  type: Type;
}
