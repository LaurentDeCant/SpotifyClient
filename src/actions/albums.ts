import { AlbumActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";
import { checkSavedAlbum, checkSavedTracks } from "./library";

export interface AlbumSuccessAction
  extends EntitiesAction<ActionType.AlbumSuccess> {}

export function getAlbum(albumId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.AlbumRequest,
        ActionType.AlbumSuccess,
        ActionType.AlbumFailure
      ],
      path: `albums/${albumId}`,
      schema: Schemas.Album,
      then: json => {
        checkSavedAlbum(albumId)(dispatch);
        const trackIds = json.tracks.items.map(({ id }: any) => id);
        checkSavedTracks(trackIds)(dispatch);
      }
    });
  };
}
