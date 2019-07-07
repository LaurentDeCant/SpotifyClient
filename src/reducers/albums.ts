import { merge } from "lodash";
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
import { AlbumDictionary } from "./types";
import createReducer from "./createReducer";

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
