import { State } from "../reducers";
import { selectAlbums } from "./albums";
import { selectTracks } from "./tracks";

export function selectSavedAlbums(state: State) {
  return selectAlbums(state)(state.library.userAlbumIds);
}

export function selectSavedTracks(state: State) {
  const tracks = selectTracks(state)(state.library.userTrackIds);
  if (tracks) {
    return tracks.filter(track => !!track);
  }

  return [];
}

export function selectPlayableTracks(state: State) {
  const tracks = selectSavedTracks(state);
  return tracks ? tracks.filter(track => track.preview_url) : [];
}
