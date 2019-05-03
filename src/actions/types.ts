import { Action } from "redux";
import { schema } from "normalizr";
import { Entities } from "../types";

export interface FetchAction {
  types: string[];
  path: string;
  schema?: schema.Entity | schema.Object;
}

export interface FetchDispatch {
  (action: FetchAction): void;
}

export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}

export interface EntitiesAction<T> extends PayloadAction<T, Entities> {}
