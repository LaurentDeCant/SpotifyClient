import { FollowingActionType as ActionType } from "../actions";
import {
  FollowedArtistsSuccessAction,
  FollowedPlaylistsSuccessAction
} from "../actions/following";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectArtists } from "./artists";
import { selectPlaylists } from "./playlists";

export interface State {
  userArtistIds: string[];
  userPlaylistIds: string[];
}

export const initialState: State = {
  userArtistIds: [],
  userPlaylistIds: []
};

export default createReducer(initialState, {
  [ActionType.FollowedArtistsSuccess]: (
    state: State,
    { payload }: FollowedArtistsSuccessAction
  ) => ({
    ...state,
    userArtistIds: Object.keys(payload.artists || {})
  }),
  [ActionType.FollowedPlaylistsSuccess]: (
    state: State,
    { payload }: FollowedPlaylistsSuccessAction
  ) => ({ ...state, userPlaylistIds: Object.keys(payload.playlists || []) })
});

export function selectFollowedArtists(state: CombinedState) {
  return selectArtists(state)(state.following.userArtistIds);
}

export function selectFollowedPlaylists(state: CombinedState) {
  return selectPlaylists(state)(state.following.userPlaylistIds);
}
