import { Dispatch } from "redux";
import { Album, Artist, Playlist } from "../types";
import { EntitiesAction, FetchDispatch, PayloadAction } from "./types";
import { SearchActionType as ActionType } from ".";
import { Schemas } from "./schemas";
import { State } from "../reducers";
import { selectAlbum as selectAlbumById } from "../reducers/albums";
import { selectArtist as selectArtistById } from "../reducers/artists";
import { selectPlaylist as selectPlaylistById } from "../reducers/playlists";

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
  extends PayloadAction<ActionType.SelectAlbum, Album> {}

export function selectAlbum(albumId: string) {
  return (dispatch: Dispatch<SelectAlbumAction>, getState: () => State) => {
    const state = getState();
    const album = selectAlbumById(state, albumId);
    dispatch({ type: ActionType.SelectAlbum, payload: album });
  };
}

export interface SelectArtistAction
  extends PayloadAction<ActionType.SelectArtist, Artist> {}

export function selectArtist(artistId: string) {
  return (dispatch: Dispatch<SelectArtistAction>, getState: () => State) => {
    const state = getState();
    const artist = selectArtistById(state, artistId);
    dispatch({ type: ActionType.SelectArtist, payload: artist });
  };
}

export interface SelectPlaylistAction
  extends PayloadAction<ActionType.SelectPlaylist, Playlist> {}

export function selectPlaylist(playlistId: string) {
  return (dispatch: Dispatch<SelectPlaylistAction>, getState: () => State) => {
    const state = getState();
    const playlist = selectPlaylistById(state, playlistId);
    dispatch({ type: ActionType.SelectPlaylist, payload: playlist });
  };
}

export function clearRecents() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.ClearRecents });
  };
}
