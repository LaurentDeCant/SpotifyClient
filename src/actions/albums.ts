import { Dispatch } from "react";
import { Action } from "redux";
import { normalize } from "normalizr";
import { fetchJson } from "../utils/authorization";
import { AlbumActionType as ActionType } from ".";
import { EntitiesAction } from "./types";
import { Schemas } from "./schemas";
import { checkSavedAlbum } from "./library";

interface AlbumRequestAction extends Action<ActionType.AlbumRequest> {}

export interface AlbumSuccessAction
  extends EntitiesAction<ActionType.AlbumSuccess> {}

export function getAlbum(albumId: string) {
  return (dispatch: Dispatch<AlbumRequestAction | AlbumSuccessAction>) => {
    dispatch({
      type: ActionType.AlbumRequest
    });
    fetchJson(`${process.env.REACT_APP_BASE_URL}/albums/${albumId}`)
      .then(checkSavedAlbum)
      .then(album => {
        dispatch({
          type: ActionType.AlbumSuccess,
          payload: normalize(album, Schemas.Album).entities
        });
      });
  };
}
