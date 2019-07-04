import { createSelector } from "reselect";
import { Type } from "../types";
import { State } from "../reducers";
import {
  AlbumDictionary,
  ArtistDictionary,
  PlaylistDictionary
} from "../reducers/types";
import { State as SearchState } from "../reducers/search";
import { selectAlbums as selectAlbumsById } from "./albums";
import { selectArtists as selectArtistsById } from "./artists";
import { selectPlaylists as selectPlaylistsById } from "./playlists";
import { selectTracks as selectTracksById } from "./tracks";

export function selectAlbums(state: State) {
  return selectAlbumsById(state)(state.search.albumIds);
}

export function selectArtists(state: State) {
  return selectArtistsById(state)(state.search.artistIds).sort(
    (x, y) => y.popularity - x.popularity
  );
}

export function selectPlaylists(state: State) {
  return selectPlaylistsById(state)(state.search.playlistIds);
}

export function selectTracks(state: State) {
  return selectTracksById(state)(state.search.trackIds);
}

export function selectPlayableTracks(state: State) {
  const tracks = selectTracks(state);
  return tracks ? tracks.filter(track => track.preview_url) : [];
}

export function selectHasResults({ search }: State) {
  return (
    !!search.albumIds.length &&
    !!search.artistIds.length &&
    !!search.playlistIds.length &&
    !!search.trackIds.length
  );
}

export const selectRecents = createSelector(
  ({ search }: State) => search,
  ({ albums }: State) => albums,
  ({ artists }: State) => artists,
  ({ playlists }: State) => playlists,
  (
    search: SearchState,
    albums: AlbumDictionary,
    artists: ArtistDictionary,
    playlists: PlaylistDictionary
  ) => {
    return search.recents.map(recent => {
      switch (recent.type) {
        case Type.Album:
          return albums[recent.id];
        case Type.Artist:
          return artists[recent.id];
        default:
          return playlists[recent.id];
      }
    });
  }
);
