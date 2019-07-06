import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import { State } from "../reducers";
import { PlaylistDictionary } from "../reducers/types";
import { selectTracks } from "./tracks";

export function selectPlaylist({ playlists }: State, playlistId: string) {
  return playlists[playlistId];
}

export function selectPlaylistTracks(state: State, albumId: string) {
  const playlist = selectPlaylist(state, albumId);
  if (playlist) {
    const tracks = selectTracks(state)(playlist.tracks);
    if (tracks) {
      return tracks;
    }
  }

  return [];
}

export const selectPlaylists = createSelector(
  ({ playlists }: State) => playlists,
  (playlists: PlaylistDictionary) =>
    memoize((playlistIds: string[]) =>
      playlistIds ? playlistIds.map(playlistId => playlists[playlistId]) : []
    )
);

export function selectPlayableTracks(state: State, playlistId: string) {
  const tracks = selectPlaylistTracks(state, playlistId);
  return tracks ? tracks.filter(track => track.preview_url) : [];
}

export function selectIsPlayable(state: State, playlistId: string) {
  return !!selectPlayableTracks(state, playlistId).length;
}
