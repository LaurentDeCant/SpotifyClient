import { Action } from "redux";
import { schema } from "normalizr";
import {
  AlbumDictionary,
  ArtistDictionary,
  CategoryDictionary,
  PlaylistDictionary,
  TrackDictionary
} from "../reducers/types";

export enum FetchMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE"
}

export interface Entities {
  albums: AlbumDictionary;
  artists: ArtistDictionary;
  categories: CategoryDictionary;
  playlists: PlaylistDictionary;
  tracks: TrackDictionary;
  results: {
    [key: string]: {
      albums: string[];
      artists: string[];
      playlists: string[];
    };
  };
}

export interface FetchAction<D = {}> {
  types: string[];
  path: string;
  method?: FetchMethod;
  schema?: schema.Entity | schema.Object;
  data?: D;
}

export interface FetchDispatch {
  (action: FetchAction): Promise<any>;
}

export interface PayloadAction<T = any, P = any> extends Action<T> {
  payload: P;
}

export interface EntitiesAction<T = any, D = {}>
  extends PayloadAction<T, Entities & D> {}
