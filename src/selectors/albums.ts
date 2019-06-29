import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import { State } from "../reducers";
import { AlbumDictionary, ArtistDictionary } from "../reducers/types";
import { selectTracks } from "./tracks";

export function selectAlbum({ albums }: State, albumId: string) {
  return albums[albumId];
}

export const selectAlbumArtists = createSelector(
  ({ albums }: State) => albums,
  ({ artists }: State) => artists,
  (albums: AlbumDictionary, artists: ArtistDictionary) =>
    memoize((albumId: string) => {
      const album = albums[albumId];
      if (album) {
        return album.artists.map(artistId => artists[artistId]);
      }

      return [];
    })
);

export function selectAlbumTracks(state: State, albumId: string) {
  const album = selectAlbum(state, albumId);
  if (album) {
    const tracks = selectTracks(state)(album.tracks);
    if (tracks) {
      return tracks.filter(track => !!track);
    }
  }

  return [];
}

export const selectAlbums = createSelector(
  (state: State) => state.albums,
  (albums: AlbumDictionary) =>
    memoize((albumIds: string[]) =>
      albumIds ? albumIds.map(albumId => albums[albumId]) : []
    )
);

export function selectPlayableTracks(state: State, albumId: string) {
  const tracks = selectAlbumTracks(state, albumId);
  return tracks ? tracks.filter(track => track && track.preview_url) : [];
}

export function selectIsPlayable(state: State, albumId: string) {
  return !!selectPlayableTracks(state, albumId).length;
}
