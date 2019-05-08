import { Action } from "redux";
import { schema } from "normalizr";
import { Entities } from "../types";

export interface FetchAction<D = {}> {
  types: string[];
  path: string;
  schema?: schema.Entity | schema.Object;
  data?: D;
}

export interface FetchDispatch {
  (action: FetchAction): void;
}

export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}

export interface EntitiesAction<T, D = {}>
  extends PayloadAction<T, Entities & D> {}
