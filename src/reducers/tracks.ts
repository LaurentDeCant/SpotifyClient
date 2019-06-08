import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import {
  AlbumActionType,
  ArtistActionType,
  LibraryActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { EntitiesAction } from "../actions/types";
import {
  SaveTrackSuccessAction,
  UnsaveTrackSuccessAction
} from "../actions/library";
import { State as CombinedState } from ".";
import { TrackDictionary } from "./types";
import createReducer from "./createReducer";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export interface State extends TrackDictionary {}

const initialState: State = {};

function mergeTracks(state: State, { payload }: EntitiesAction<any>): State {
  return merge({}, state, payload.tracks);
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeTracks,
  [ArtistActionType.ArtistTopTracksSuccess]: mergeTracks,
  [ArtistActionType.FullArtistSuccess]: mergeTracks,
  [PlaylistActionType.PlaylistSuccess]: mergeTracks,
  [SearchActionType.SearchSuccess]: mergeTracks,
  [LibraryActionType.SavedAlbumsSuccess]: mergeTracks,
  [LibraryActionType.SavedTracksSuccess]: mergeTracks,
  [LibraryActionType.SaveTrackSuccess]: (
    state: State,
    { payload }: SaveTrackSuccessAction
  ) => ({
    ...state,
    [payload.trackId]: {
      ...state[payload.trackId],
      isSaved: true
    }
  }),
  [LibraryActionType.UnsaveTrackSuccess]: (
    state: State,
    { payload }: UnsaveTrackSuccessAction
  ) => ({
    ...state,
    [payload.trackId]: {
      ...state[payload.trackId],
      isSaved: false
    }
  })
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
