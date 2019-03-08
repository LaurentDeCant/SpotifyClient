import { Action, Dispatch } from "redux";
import { PlaylistTrack } from "../types";
import PayloadAction from "./types";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  RequestPlaylistTracks = "REQUEST_PLAYLIST_TRACKS",
  ReceivePlaylistTracks = "RECEIVE_PLAYLIST_TRACKS"
}

export interface RequestPlaylistTracksAction
  extends Action<ActionType.RequestPlaylistTracks> {}

function requestPlaylistTracks(): RequestPlaylistTracksAction {
  return {
    type: ActionType.RequestPlaylistTracks
  };
}

export interface ReceivePlaylistTracksAction
  extends PayloadAction<ActionType.ReceivePlaylistTracks, PlaylistTrack[]> {}

function receivePlaylistTracks(
  tracks: PlaylistTrack[]
): ReceivePlaylistTracksAction {
  return {
    type: ActionType.ReceivePlaylistTracks,
    payload: tracks
  };
}

export function getPlaylistTracks(playlistId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestPlaylistTracks());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/playlists/${playlistId}/tracks`
    );
    const json = await response.json();
    dispatch(receivePlaylistTracks(json.items));
  };
}
