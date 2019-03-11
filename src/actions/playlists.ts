import { PlaylistTrack, Playlist } from "../types";
import { PayloadAction, FetchDispatch } from "./types";

export enum ActionType {
  PlaylistRequest = "PLAYLIST_REQUEST",
  PlaylistSuccess = "PLAYLIST_SUCCESS",
  PlaylistFailure = "PLAYLIST_FAILURE",
  PlaylistTracksRequest = "PLAYLIST_TRACKS_REQUEST",
  PlaylistTracksSuccess = "PLAYLIST_TRACKS_SUCCESS",
  PlaylistTracksFailure = "PLAYLIST_TRACKS_FAILURE"
}

export interface PlaylistSuccessAction
  extends PayloadAction<ActionType.PlaylistSuccess, Playlist> {}

export function getPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.PlaylistRequest,
        ActionType.PlaylistSuccess,
        ActionType.PlaylistFailure
      ],
      path: `playlists/${playlistId}`
    });
  };
}

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
