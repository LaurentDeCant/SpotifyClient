import { Action, Dispatch } from "redux";
import { Album, Category, Playlist } from "../types";
import PayloadAction from "./types";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  RequestCategories = "REQUEST_CATEGORIES",
  ReceiveCategories = "RECEIVE_CATEGORIES",
  RequestNewReleases = "REQUEST_NEW_RELEASES",
  ReceiveNewReleases = "RECEIVE_NEW_RELEASES",
  RequestFeaturedPlaylists = "REQUEST_FEATURED_PLAYLISTS",
  ReceiveFeaturedPlaylists = "RECEIVE_FEATURED_PLAYLISTS",
  RequestCategoryPlaylists = "REQUEST_CATEGORY_PLAYLISTS",
  ReceiveCategoryPlaylists = "RECEIVE_CATEGORY_PLAYLISTS"
}

export interface RequestCategoriesAction
  extends Action<ActionType.RequestCategories> {}

function requestCategories(): RequestCategoriesAction {
  return {
    type: ActionType.RequestCategories
  };
}

export interface ReceiveCategoriesAction
  extends PayloadAction<ActionType.ReceiveCategories, Category[]> {}

function receiveCategories(categories: Category[]): ReceiveCategoriesAction {
  return {
    type: ActionType.ReceiveCategories,
    payload: categories
  };
}

export function getCategories() {
  return async (dispatch: Dispatch) => {
    dispatch(requestCategories());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/browse/categories`
    );
    const json = await response.json();
    const items = json.categories ? json.categories.items : [];
    dispatch(receiveCategories(items));
  };
}

export interface RequestNewReleasesAction
  extends Action<ActionType.RequestNewReleases> {}

function requestNewReleases(): RequestNewReleasesAction {
  return {
    type: ActionType.RequestNewReleases
  };
}
export interface ReceiveNewReleasesAction
  extends PayloadAction<ActionType.ReceiveNewReleases, Album[]> {}

function receiveNewReleases(albums: Album[]): ReceiveNewReleasesAction {
  return {
    type: ActionType.ReceiveNewReleases,
    payload: albums
  };
}

export function getNewReleases() {
  return async (dispatch: Dispatch) => {
    dispatch(requestNewReleases());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/browse/new-releases`
    );
    const json = await response.json();
    const items = json.albums ? json.albums.items : [];
    dispatch(receiveNewReleases(items));
  };
}

export interface RequestFeaturedPlaylistsAction
  extends Action<ActionType.RequestFeaturedPlaylists> {}

function requestFeaturedPlaylists(): RequestFeaturedPlaylistsAction {
  return {
    type: ActionType.RequestFeaturedPlaylists
  };
}

export interface ReceiveFeaturedPlaylistsAction
  extends PayloadAction<ActionType.ReceiveFeaturedPlaylists, Playlist[]> {}

function receiveFeaturedPlaylists(
  playlists: Playlist[]
): ReceiveFeaturedPlaylistsAction {
  return {
    type: ActionType.ReceiveFeaturedPlaylists,
    payload: playlists
  };
}

export function getFeaturedPlaylists() {
  return async (dispatch: Dispatch) => {
    dispatch(requestFeaturedPlaylists());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/browse/featured-playlists`
    );
    const json = await response.json();
    const items = json.playlists ? json.playlists.items : [];
    dispatch(receiveFeaturedPlaylists(items));
  };
}

export interface RequestCategoryPlaylistsAction
  extends Action<ActionType.RequestCategoryPlaylists> {}

function requestCategoryPlaylists(): RequestCategoryPlaylistsAction {
  return {
    type: ActionType.RequestCategoryPlaylists
  };
}

export interface ReceiveCategoryPlaylistsAction
  extends PayloadAction<ActionType.ReceiveCategoryPlaylists, Playlist[]> {}

function receiveCategoryPlaylists(
  playlists: Playlist[]
): ReceiveCategoryPlaylistsAction {
  return {
    type: ActionType.ReceiveCategoryPlaylists,
    payload: playlists
  };
}

export function getCategoryPlaylists(categoryId: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestCategoryPlaylists());
    const response = await authorizedFetch(
      `${
        process.env.REACT_APP_BASE_URL
      }/browse/categories/${categoryId}/playlists`
    );
    const json = await response.json();
    const items = json.playlists ? json.playlists.items : [];
    dispatch(receiveCategoryPlaylists(items));
  };
}
