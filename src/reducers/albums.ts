import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import { Album, Artist } from "../types";
import { EntitiesAction } from "../actions/types";
import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectTracks } from "./tracks";

export interface State {
  [id: string]: Album;
}

const initialState: State = {};

function mergeAlbums(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.albums);
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeAlbums,
  [ArtistActionType.FullArtistSuccess]: mergeAlbums,
  [PlaylistActionType.PlaylistSuccess]: mergeAlbums,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeAlbums,
  [BrowseActionType.NewReleasesSuccess]: mergeAlbums,
  [SearchActionType.SearchSuccess]: mergeAlbums
});

export function selectIsAlbum({ albums }: CombinedState, albumId: string) {
  return !!albums[albumId];
}

export function selectAlbum({ albums }: CombinedState, albumId: string) {
  return albums[albumId];
}

export const selectAlbumArtists = createSelector(
  ({ albums }: CombinedState) => albums,
  ({ artists }: CombinedState) => artists,
  (
    albums: { [albumId: string]: Album },
    artists: { [artistId: string]: Artist }
  ) =>
    memoize((albumId: string) => {
      console.log("selectAlbumArtists");
      const album = albums[albumId];
      if (album) {
        return album.artists.map(artistId => artists[artistId]);
      }

      return [];
    })
);

export function selectAlbumsArtists(state: CombinedState, albumIds: string) {
  return [];
}

export function selectAlbumTracks(state: CombinedState, albumId: string) {
  const album = selectAlbum(state, albumId);
  if (album) {
    const tracks = selectTracks(state)(album.tracks);
    if (tracks) {
      return tracks;
    }
  }

  return [];
}

export const selectAlbums = createSelector(
  (state: CombinedState) => state.albums,
  (albums: { [albumId: string]: Album }) =>
    memoize((albumIds: string[]) => {
      console.log("selectAlbums");
      return albumIds ? albumIds.map(albumId => albums[albumId]) : [];
    })
);

export function selectPlayableTracks(state: CombinedState, albumId: string) {
  const tracks = selectAlbumTracks(state, albumId);
  return tracks.filter(track => track.preview_url);
}

export function selectIsPlayable(state: CombinedState, albumId: string) {
  return !!selectPlayableTracks(state, albumId).length;
}
