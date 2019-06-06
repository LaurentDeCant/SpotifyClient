import {
  ActionType,
  UserArtistsSuccessAction,
  UserPlaylistsSuccessAction
} from "../actions/following";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectArtists } from "./artists";
import { selectPlaylists } from "./playlists";

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

export function selectUserArtists(state: CombinedState) {
  return selectArtists(state)(state.following.userArtistIds);
}

export function selectUserPlaylists(state: CombinedState) {
  return selectPlaylists(state)(state.following.userPlaylistIds);
}
