import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import { State } from "../reducers";
import { TrackDictionary } from "../reducers/types";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export function selectTrack({ tracks }: State, trackId: string) {
  return tracks[trackId];
}

export function selectTrackAlbum(state: State, trackId: string) {
  const track = selectTrack(state, trackId);
  if (track) {
    return selectAlbum(state, track.album);
  }
}

export function selectTrackArtists(state: State, trackId: string) {
  const track = selectTrack(state, trackId);
  return track ? selectArtists(state)(track.artists) : [];
}

export const selectTracks = createSelector(
  (state: State) => state.tracks,
  (tracks: TrackDictionary) =>
    memoize((trackIds: string[]) =>
      trackIds ? trackIds.map(trackId => tracks[trackId]) : []
    )
);
