import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  LibraryActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { EntitiesAction } from "../actions/types";
import {
  SaveAlbumSuccessAction,
  UnsaveAlbumSuccessAction,
  CheckSavedAlbumSuccess
} from "../actions/library";
import { State as CombinedState } from ".";
import { AlbumDictionary, ArtistDictionary } from "./types";
import createReducer from "./createReducer";
import { selectTracks } from "./tracks";

export interface State extends AlbumDictionary {}

export const initialState: State = {};

function mergeAlbums(state: State, { payload }: EntitiesAction) {
  return merge({}, state, payload.albums);
}

function updateAlbum(state: State, albumId: string, props: any) {
  return {
    ...state,
    [albumId]: {
      ...state[albumId],
      ...props
    }
  };
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeAlbums,
  [PlaylistActionType.PlaylistSuccess]: mergeAlbums,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeAlbums,
  [BrowseActionType.NewReleasesSuccess]: mergeAlbums,
  [SearchActionType.SearchSuccess]: mergeAlbums,
  [LibraryActionType.SavedAlbumsSuccess]: mergeAlbums,
  [LibraryActionType.SavedTracksSuccess]: mergeAlbums,
  [LibraryActionType.CheckSavedAlbumSuccess]: (
    state: State,
    { payload }: CheckSavedAlbumSuccess
  ) => updateAlbum(state, payload.albumId, { isSaved: payload[0] }),
  [LibraryActionType.SaveAlbumSuccess]: (
    state: State,
    { payload }: SaveAlbumSuccessAction
  ) => updateAlbum(state, payload.albumId, { isSaved: true }),
  [LibraryActionType.UnsaveAlbumSuccess]: (
    state: State,
    { payload }: UnsaveAlbumSuccessAction
  ) => updateAlbum(state, payload.albumId, { isSaved: false })
});

export function selectAlbum({ albums }: CombinedState, albumId: string) {
  return albums[albumId];
}

export const selectAlbumArtists = createSelector(
  ({ albums }: CombinedState) => albums,
  ({ artists }: CombinedState) => artists,
  (albums: AlbumDictionary, artists: ArtistDictionary) =>
    memoize((albumId: string) => {
      const album = albums[albumId];
      if (album) {
        return album.artists.map(artistId => artists[artistId]);
      }

      return [];
    })
);

export function selectAlbumTracks(state: CombinedState, albumId: string) {
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
  (state: CombinedState) => state.albums,
  (albums: AlbumDictionary) =>
    memoize((albumIds: string[]) =>
      albumIds ? albumIds.map(albumId => albums[albumId]) : []
    )
);

export function selectPlayableTracks(state: CombinedState, albumId: string) {
  const tracks = selectAlbumTracks(state, albumId);
  return tracks ? tracks.filter(track => track && track.preview_url) : [];
}

export function selectIsPlayable(state: CombinedState, albumId: string) {
  return !!selectPlayableTracks(state, albumId).length;
}
