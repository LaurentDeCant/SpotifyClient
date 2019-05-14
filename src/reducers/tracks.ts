import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import {
  NormalizedTrack,
  DenormalizedTrack,
  DenormalizedAlbum,
  DenormalizedArtist
} from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  AlbumActionType,
  ArtistActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export interface State {
  [id: string]: NormalizedTrack;
}

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

export function selectTrack(
  { tracks }: CombinedState,
  trackId: string
): DenormalizedTrack {
  //@ts-ignore
  return tracks[trackId];
}

export function selectTrackAlbum(
  state: CombinedState,
  trackId: string
): DenormalizedAlbum {
  const track = selectTrack(state, trackId);
  //@ts-ignore
  return selectAlbum(state, track.album);
}

export function selectTrackArtists(
  state: CombinedState,
  trackId: string
): DenormalizedArtist[] {
  const track = selectTrack(state, trackId);
  return selectArtists(state)(track.artists);
}

export const selectTracks = createSelector(
  //@ts-ignore
  (state: CombinedState) => state.tracks,
  (tracks: {
    [trackId: string]: DenormalizedTrack;
  }): ((trackIds: string[]) => DenormalizedTrack[]) => {
    console.log("selectTracks");
    return memoize((trackIds: string[]) =>
      trackIds ? trackIds.map(trackId => tracks[trackId]) : []
    );
  }
);
