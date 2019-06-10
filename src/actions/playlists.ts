import { State } from "../reducers";
import { selectUserProfile } from "../reducers/userProfile";
import { PlaylistActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";
import { checkFollowedPlaylist } from "./following";
import { checkSavedTracks } from "./library";

export interface PlaylistSuccessAction
  extends EntitiesAction<ActionType.PlaylistSuccess> {}

export function getPlaylist(playlistId: string) {
  return (dispatch: FetchDispatch, getState: () => State) => {
    dispatch({
      types: [
        ActionType.PlaylistRequest,
        ActionType.PlaylistSuccess,
        ActionType.PlaylistFailure
      ],
      path: `playlists/${playlistId}`,
      schema: Schemas.Playlist,
      then: json => {
        const state = getState();
        const userProfile = selectUserProfile(state);
        if (userProfile) {
          checkFollowedPlaylist(playlistId, userProfile.id)(dispatch);
        }
        const trackIds = json.tracks.items.map(({ track }: any) => track.id);
        checkSavedTracks(trackIds)(dispatch);
      }
    });
  };
}
