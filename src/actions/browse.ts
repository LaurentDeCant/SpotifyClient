import { Album, Category, Playlist } from "../types";
import { FetchDispatch, PayloadAction } from "./types";

export enum ActionType {
  CategoriesRequest = "CATEGORIES_REQUEST",
  CategoriesSuccess = "CATEGORIES_SUCCESS",
  CategoriesFailure = "CATEGORIES_FAILURE",
  CategoryRequest = "CATEGORY_REQUEST",
  CategorySuccess = "CATEGORY_SUCCESS",
  CategoryFailure = "CATEGORY_FAILURE",
  NewReleasesRequest = "NEW_RELEASES_REQUEST",
  NewReleasesSuccess = "NEW_RELEASES_SUCCESS",
  NewReleasesFailure = "NEW_RELEASES_FAILURE",
  FeaturedPlaylistsRequest = "FEATURED_PLAYLISTS_REQUEST",
  FeaturedPlaylistsSuccess = "FEATURED_PLAYLISTS_SUCCESS",
  FeaturedPlaylistsFailure = "FEATURED_PLAYLISTS_FAILURE",
  CategoryPlaylistsRequest = "CATEGORY_PLAYLISTS_REQUEST",
  CategoryPlaylistsSuccess = "CATEGORY_PLAYLISTS_SUCCESS",
  CategoryPlaylistsFailure = "CATEGORY_PLAYLISTS_FAILURE"
}

export interface CategoriesSuccessAction
  extends PayloadAction<ActionType.CategoriesSuccess, Category[]> {}

export function getCategories() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CategoriesRequest,
        ActionType.CategoriesSuccess,
        ActionType.CategoriesFailure
      ],
      path: "browse/categories",
      select: (object: any) => object.categories.items
    });
  };
}

export interface CategorySuccessAction
  extends PayloadAction<ActionType.CategorySuccess, Category> {}

export function getCategory(categoryId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CategoryRequest,
        ActionType.CategorySuccess,
        ActionType.CategoryFailure
      ],
      path: `browse/categories/${categoryId}`
    });
  };
}

export interface NewReleasesSuccessAction
  extends PayloadAction<ActionType.NewReleasesSuccess, Album[]> {}

export function getNewReleases() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.NewReleasesRequest,
        ActionType.NewReleasesSuccess,
        ActionType.NewReleasesFailure
      ],
      path: "browse/new-releases",
      select: (object: any) => object.albums.items
    });
  };
}

export interface FeaturedPlaylistsSuccessAction
  extends PayloadAction<ActionType.FeaturedPlaylistsSuccess, Playlist[]> {}

export function getFeaturedPlaylists() {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.FeaturedPlaylistsRequest,
        ActionType.FeaturedPlaylistsSuccess,
        ActionType.FeaturedPlaylistsFailure
      ],
      path: "browse/featured-playlists",
      select: (object: any) => object.playlists.items
    });
  };
}

export interface CategoryPlaylistsSuccessAction
  extends PayloadAction<ActionType.CategoryPlaylistsSuccess, Playlist[]> {}

export function getCategoryPlaylists(categoryId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.CategoryPlaylistsRequest,
        ActionType.CategoryPlaylistsSuccess,
        ActionType.CategoryPlaylistsFailure
      ],
      path: `browse/categories/${categoryId}/playlists`,
      select: (object: any) => object.playlists.items
    });
  };
}
