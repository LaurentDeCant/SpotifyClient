import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import { EntitiesAction } from "../actions/types";
import {
  AlbumActionType,
  ArtistActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { TrackDictionary } from "./types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export interface State extends TrackDictionary {}

const initialState: State = {};

function mergeTracks(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.tracks);
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeTracks,
  [ArtistActionType.ArtistTopTracksSuccess]: mergeTracks,
  [ArtistActionType.FullArtistSuccess]: mergeTracks,
  [PlaylistActionType.PlaylistSuccess]: mergeTracks,
  [SearchActionType.SearchSuccess]: mergeTracks
});

export function selectTrack({ tracks }: CombinedState, trackId: string) {
  return tracks[trackId];
}

export function selectTrackAlbum(state: CombinedState, trackId: string) {
  const track = selectTrack(state, trackId);
  return selectAlbum(state, track.album);
}

export function selectTrackArtists(state: CombinedState, trackId: string) {
  const track = selectTrack(state, trackId);
  return selectArtists(state)(track.artists);
}

export const selectTracks = createSelector(
  (state: CombinedState) => state.tracks,
  (tracks: TrackDictionary) =>
    memoize((trackIds: string[]) =>
      trackIds ? trackIds.map(trackId => tracks[trackId]) : []
    )
);
