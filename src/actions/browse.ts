import { BrowseActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export interface CategoriesSuccessAction
  extends EntitiesAction<ActionType.CategoriesSuccess> {}

export function getCategories() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CategoriesRequest,
        ActionType.CategoriesSuccess,
        ActionType.CategoriesFailure
      ],
      path: "browse/categories",
      schema: Schemas.PagedCategories
    });
  };
}

export interface CategorySuccessAction
  extends EntitiesAction<ActionType.CategorySuccess> {}

export function getCategory(categoryId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CategoryRequest,
        ActionType.CategorySuccess,
        ActionType.CategoryFailure
      ],
      path: `browse/categories/${categoryId}`,
      schema: Schemas.Category,
      success: () => {
        getCategoryPlaylists(categoryId)(dispatch);
      }
    });
  };
}

export interface CategoryPlaylistsSuccessAction
  extends EntitiesAction<ActionType.CategoryPlaylistsSuccess> {}

export function getCategoryPlaylists(categoryId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CategoryPlaylistsRequest,
        ActionType.CategoryPlaylistsSuccess,
        ActionType.CategoryPlaylistsFailure
      ],
      path: `browse/categories/${categoryId}/playlists`,
      schema: Schemas.PagedPlaylists
    });
  };
}

export interface FeaturedPlaylistsSuccessAction
  extends EntitiesAction<ActionType.FeaturedPlaylistsSuccess> {}

export function getFeaturedPlaylists() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.FeaturedPlaylistsRequest,
        ActionType.FeaturedPlaylistsSuccess,
        ActionType.FeaturedPlaylistsFailure
      ],
      path: "browse/featured-playlists",
      schema: Schemas.PagedPlaylists
    });
  };
}

export interface NewReleasesSuccessAction
  extends EntitiesAction<ActionType.NewReleasesSuccess> {}

export function getNewReleases() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.NewReleasesRequest,
        ActionType.NewReleasesSuccess,
        ActionType.NewReleasesFailure
      ],
      path: "browse/new-releases",
      schema: Schemas.PagedAlbums
    });
  };
}
