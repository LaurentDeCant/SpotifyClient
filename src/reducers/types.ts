import { Dictionary } from "lodash";
import { Album, Artist, Category, Playlist, Track, Type } from "../types";

export interface AlbumDictionary extends Dictionary<Album> {}
export interface ArtistDictionary extends Dictionary<Artist> {}
export interface CategoryDictionary extends Dictionary<Category> {}
export interface PlaylistDictionary extends Dictionary<Playlist> {}
export interface TrackDictionary extends Dictionary<Track> {}

export interface Collection {
  id: string;
  type: Type;
}

export enum PlayState {
  None = "NONE",
  Playing = "IS_PLAYING",
  Paused = "IS_PAUSED"
}
