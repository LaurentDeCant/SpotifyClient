import { Action } from "redux";
import { PlaylistTrack } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

export enum ActionType {
  PlaylistTracksRequest = "PLAYLIST_TRACKS_REQUEST",
  PlaylistTracksSuccess = "PLAYLIST_TRACKS_SUCCESS",
  PlaylistTracksFailure = "PLAYLIST_TRACKS_FAILURE"
}

export interface PlaylistTracksRequestAction
  extends Action<ActionType.PlaylistTracksRequest> {}

export interface PlaylistTracksSuccessAction
  extends PayloadAction<ActionType.PlaylistTracksSuccess, PlaylistTrack[]> {}

export function getPlaylistTracks(playlistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.PlaylistTracksRequest,
        ActionType.PlaylistTracksSuccess,
        ActionType.PlaylistTracksFailure
      ],
      path: `playlists/${playlistId}/tracks`,
      select: (object: any) => object.items
    });
  };
}
