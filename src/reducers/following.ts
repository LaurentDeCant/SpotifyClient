import createReducer from "./createReducer";
import {
  ActionType,
  UserArtistsSuccessAction,
  UserPlaylistsSuccessAction
} from "../actions/following";

export interface State {
  userArtistIds: string[];
  userPlaylistIds: string[];
}

const initialState: State = {
  userArtistIds: [],
  userPlaylistIds: []
};

export default createReducer(initialState, {
  [ActionType.UserArtistsSuccess]: (
    state: State,
    { payload }: UserArtistsSuccessAction
  ) => ({
    ...state,
    userArtistIds: Object.keys(payload.artists || {})
  }),
  [ActionType.UserPlaylistsSuccess]: (
    state: State,
    { payload }: UserPlaylistsSuccessAction
  ) => ({ ...state, userPlaylistIds: Object.keys(payload.playlists || []) })
});
