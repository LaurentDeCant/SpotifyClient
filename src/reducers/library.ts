import createReducer from "./createReducer";
import { ActionType } from "../actions/library";

export interface State {}

const initialState: State = {};

export default createReducer(initialState, {
  [ActionType.AlbumsSuccess]: (state: State) => ({ ...state }),
  [ActionType.TracksSuccess]: (state: State) => ({ ...state })
});
