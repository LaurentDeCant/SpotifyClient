import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
  PlaylistRequest = "PLAYLIST_REQUEST",
  PlaylistSuccess = "PLAYLIST_SUCCESS",
  PlaylistFailure = "PLAYLIST_FAILURE"
}

export interface PlaylistSuccessAction
  extends EntitiesAction<ActionType.PlaylistSuccess> {}

export function getPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.PlaylistRequest,
        ActionType.PlaylistSuccess,
        ActionType.PlaylistFailure
      ],
      path: `playlists/${playlistId}`,
      schema: Schemas.Playlist
    });
  };
}
