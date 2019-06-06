import { LibraryActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export interface SavedAlbumsSuccessAction
  extends EntitiesAction<ActionType.SavedAlbumsSuccess> {}

export function getSavedAlbums() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SavedAlbumsRequest,
        ActionType.SavedAlbumsSuccess,
        ActionType.SavedAlbumsFailure
      ],
      path: "me/albums",
      schema: Schemas.PagedAlbums
    });
  };
}

export interface SavedTracksSuccessAction
  extends EntitiesAction<ActionType.SavedTracksSuccess> {}

export function getSavedTracks() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.SavedTracksRequest,
        ActionType.SavedTracksSuccess,
        ActionType.SavedTracksFailure
      ],
      path: "me/tracks",
      schema: Schemas.PagedTracks
    });
  };
}
