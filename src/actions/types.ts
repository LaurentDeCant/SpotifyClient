import { Action } from "redux";
import { schema } from "normalizr";
import { Album, Artist, Category, Playlist, Track } from "../types";

export enum FetchMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE"
}

export interface Entities {
  albums: { [id: string]: Album };
  artists: { [id: string]: Artist };
  categories: { [id: string]: Category };
  playlists: { [id: string]: Playlist };
  tracks: { [id: string]: Track };
  results: {
    [id: string]: {
      albums: Album[];
      artists: Artist[];
      playlists: Playlist[];
    };
  };
}

export interface FetchAction<D = {}> {
  types: string[];
  path: string;
  method?: FetchMethod;
  schema?: schema.Entity | schema.Object;
  data?: D;
  then?: (json: any) => void;
}

export interface FetchDispatch {
  (action: FetchAction): void;
}

export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}

export interface EntitiesAction<T, D = {}>
  extends PayloadAction<T, Entities & D> {}
