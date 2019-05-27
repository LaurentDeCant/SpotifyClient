import { Dispatch } from "redux";
import { EntitiesAction, FetchDispatch, PayloadAction } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
  SearchRequest = "SEARCH_REQUEST",
  SearchSuccess = "SEARCH_SUCCESS",
  SearchFailure = "SEARCH_FAILURE",
  ClearResults = "CLEAR_RESULTS",
  SelectAlbum = "SELECT_ALBUM",
  SelectArtist = "SELECT_ARTIST",
  selectPlaylist = "SELECT_PLAYLIST"
}

export interface SearchSuccessAction
  extends EntitiesAction<ActionType.SearchSuccess> {}

export function search(query: string) {
  if (query) {
    return (dispatch: FetchDispatch) => {
      const encoded = encodeURIComponent(query);
      dispatch({
        types: [
          ActionType.SearchRequest,
          ActionType.SearchSuccess,
          ActionType.SearchFailure
        ],
        path: `search?q=${encoded}*&type=album,artist,playlist`,
        schema: Schemas.Results
      });
    };
  } else {
    return (dispatch: Dispatch) => {
      dispatch({
        type: ActionType.ClearResults
      });
    };
  }
}

export interface SelectAlbumAction
  extends PayloadAction<ActionType.SelectAlbum, { albumId: string }> {}

export function selectAlbum(albumId: string) {
  return (dispatch: Dispatch<SelectAlbumAction>) => {
    dispatch({ type: ActionType.SelectAlbum, payload: { albumId } });
  };
}

export interface SelectArtistAction
  extends PayloadAction<ActionType.SelectArtist, { artistId: string }> {}

export function selectArtist(artistId: string) {
  return (dispatch: Dispatch<SelectArtistAction>) => {
    dispatch({ type: ActionType.SelectArtist, payload: { artistId } });
  };
}

export interface SelectPlaylistAction
  extends PayloadAction<ActionType.selectPlaylist, { playlistId: string }> {}

export function selectPlaylist(playlistId: string) {
  return (dispatch: Dispatch<SelectPlaylistAction>) => {
    dispatch({ type: ActionType.selectPlaylist, payload: { playlistId } });
  };
}
