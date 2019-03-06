import { Action } from "redux";

export default interface PayloadAction<T, P> extends Action<T> {
  payload: P;
}
