import { Album, Artist, Playlist, Track } from "../types";

interface Dictionary<T> {
  [key: string]: T;
}

export interface AlbumDictionary extends Dictionary<Album> {}
export interface ArtistDictionary extends Dictionary<Artist> {}
export interface PlaylistDictionary extends Dictionary<Playlist> {}
export interface TrackDictionary extends Dictionary<Track> {}
