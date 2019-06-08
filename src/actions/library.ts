import { State } from "../reducers";
import { selectAlbum } from "../reducers/albums";
import { fetchJson } from "../utils/authorization";
import { LibraryActionType as ActionType } from ".";
import {
  PayloadAction,
  EntitiesAction,
  FetchDispatch,
  FetchMethod
} from "./types";
import { Schemas } from "./schemas";

export interface SavedAlbumsSuccessAction
  extends EntitiesAction<ActionType.SavedAlbumsSuccess> {}

export function getSavedAlbums() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SavedAlbumsRequest,
        ActionType.SavedAlbumsSuccess,
        ActionType.SavedAlbumsFailure
      ],
      path: "me/albums",
      schema: Schemas.PagedAlbums
    });
  };
}

export async function checkSavedAlbum(albumId: string) {
  const array = await fetchJson(
    `${process.env.REACT_APP_BASE_URL}/me/albums/contains?ids=${albumId}`
  );
  return array[0];
}

export interface SaveAlbumSuccessAction
  extends PayloadAction<ActionType.SaveAlbumSuccess, { albumId: string }> {}

function saveAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SaveAlbumRequest,
        ActionType.SaveAlbumSuccess,
        ActionType.SaveAlbumFailure
      ],
      path: `me/albums?ids=${albumId}`,
      method: FetchMethod.Put,
      data: { albumId }
    });
  };
}

export interface UnsaveAlbumSuccessAction
  extends PayloadAction<ActionType.UnsaveAlbumSuccess, { albumId: string }> {}

function UnsaveAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.UnsaveAlbumRequest,
        ActionType.UnsaveAlbumSuccess,
        ActionType.UnsaveAlbumFailure
      ],
      path: `me/albums?ids=${albumId}`,
      method: FetchMethod.Delete,
      data: { albumId }
    });
  };
}

export function toggleSavedAlbum(albumId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    const state = getState();
    const album = selectAlbum(state, albumId);
    if (album.isSaved) {
      UnsaveAlbum(albumId)(dispatch);
    } else {
      saveAlbum(albumId)(dispatch);
    }
  };
}

export interface SavedTracksSuccessAction
  extends EntitiesAction<ActionType.SavedTracksSuccess> {}

export function getSavedTracks() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SavedTracksRequest,
        ActionType.SavedTracksSuccess,
        ActionType.SavedTracksFailure
      ],
      path: "me/tracks",
      schema: Schemas.PagedTracks
    });
  };
}
