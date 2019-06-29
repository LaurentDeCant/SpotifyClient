import { createSelector } from "reselect";
import { Album, Artist, Playlist, Type } from "../types";
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

export function selectAlbums(state: State): Album[] {
  return selectAlbumsById(state)(state.search.albumIds);
}

export function selectArtists(state: State): Artist[] {
  return selectArtistsById(state)(state.search.artistIds).sort(
    (x, y) => y.popularity - x.popularity
  );
}

export function selectPlaylists(state: State): Playlist[] {
  return selectPlaylistsById(state)(state.search.playlistIds);
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
