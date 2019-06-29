import { FollowingActionType as ActionType } from "../actions";
import {
  FollowedArtistsSuccessAction,
  FollowedPlaylistsSuccessAction
} from "../actions/following";
import createReducer from "./createReducer";

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
