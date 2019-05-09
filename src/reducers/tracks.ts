import merge from "lodash/merge";
import { denormalize } from "normalizr";
import { NormalizedTrack, DenormalizedTrack } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  AlbumActionType,
  ArtistActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { schemas } from "./schemas";

export interface State {
  [id: string]: NormalizedTrack;
}

const initialState: State = {};

function mergeTracks(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.tracks);
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeTracks,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeTracks,
  [PlaylistActionType.PlaylistSuccess]: mergeTracks,
  [SearchActionType.SearchSuccess]: mergeTracks
});

export function selectTrack(
  state: CombinedState,
  trackId: string
): DenormalizedTrack {
  return denormalize(state.tracks[trackId], schemas.track, state);
}

export function selectTracks(
  state: CombinedState,
  trackIds: string[]
): DenormalizedTrack[] {
  return trackIds ? trackIds.map(id => selectTrack(state, id)) : [];
}
