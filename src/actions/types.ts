import { Action } from "redux";

export interface FetchAction {
  types: string[];
  path: string;
  select?: (json: object) => object;
}

export interface FetchDispatch {
  (action: FetchAction): void;
}

export interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}
