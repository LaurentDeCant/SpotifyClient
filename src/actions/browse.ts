import { Action, Dispatch } from "redux";
import { Category, Album, Playlist } from "../types/browse";
import { authorizedFetch } from "../helpers/authorization";
import PayloadAction from "./types";

export enum ActionType {
  RequestCategories = "REQUEST_CATEGORIES",
  ReceiveCategories = "RECEIVE_CATEGORIES",
  RequestNewReleases = "REQUEST_NEW_RELEASES",
  ReceiveNewReleases = "RECEIVE_NEW_RELEASES",
  RequestFeaturedPlaylists = "REQUEST_FEATURED_PLAYLISTS",
  ReceiveFeaturedPlaylists = "RECEIVE_FEATURED_PLAYLISTS"
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

function receiveNewReleases(newReleases: Album[]): ReceiveNewReleasesAction {
  return {
    type: ActionType.ReceiveNewReleases,
    payload: newReleases
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
  featuredPlaylists: Playlist[]
): ReceiveFeaturedPlaylistsAction {
  return {
    type: ActionType.ReceiveFeaturedPlaylists,
    payload: featuredPlaylists
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
