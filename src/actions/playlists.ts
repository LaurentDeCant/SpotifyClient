import { Dispatch } from "react";
import { Action } from "redux";
import { normalize } from "normalizr";
import { State } from "../reducers";
import { selectUserProfile } from "../reducers/userProfile";
import { fetchJson } from "../utils/authorization";
import { PlaylistActionType as ActionType } from ".";
import { EntitiesAction } from "./types";
import { Schemas } from "./schemas";
import { checkFollowedPlaylist } from "./following";

interface PlaylistRequestAction extends Action<ActionType.PlaylistRequest> {}

export interface PlaylistSuccessAction
  extends EntitiesAction<ActionType.PlaylistSuccess> {}

export function getPlaylist(playlistId: string) {
  return (
    dispatch: Dispatch<PlaylistRequestAction | PlaylistSuccessAction>,
    getState: () => State
  ) => {
    dispatch({
      type: ActionType.PlaylistRequest
    });
    const state = getState();
    const userProfile = selectUserProfile(state);
    fetchJson(`${process.env.REACT_APP_BASE_URL}/playlists/${playlistId}`)
      .then(async playlist => ({
        ...playlist,
        isFollowed: userProfile
          ? await checkFollowedPlaylist(playlist.id, userProfile.id)
          : undefined
      }))
      .then(playlist => {
        dispatch({
          type: ActionType.PlaylistSuccess,
          payload: normalize(playlist, Schemas.Playlist).entities
        });
      });
  };
}
