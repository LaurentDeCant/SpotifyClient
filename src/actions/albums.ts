import { AlbumActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

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
      schema: Schemas.Album
    });
  };
}
