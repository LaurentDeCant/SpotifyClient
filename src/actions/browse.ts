import { Action, Dispatch } from "redux";
import { Category, Album } from "../types/browse";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  RequestCategories = "REQUEST_CATEGORIES",
  ReceiveCategories = "RECEIVE_CATEGORIES",
  RequestNewReleases = "REQUEST_NEW_RELEASES",
  ReceiveNewReleases = "RECEIVE_NEW_RELEASES"
}

export interface RequestCategoriesAction extends Action {
  type: ActionType.RequestCategories;
}

function requestCategories(): RequestCategoriesAction {
  return {
    type: ActionType.RequestCategories
  };
}

export interface ReceiveCategoriesAction extends Action {
  type: ActionType.ReceiveCategories;
  payload: Category[];
}

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

export interface RequestNewReleasesAction extends Action {
  type: ActionType.RequestNewReleases;
}

function requestNewReleases(): RequestNewReleasesAction {
  return {
    type: ActionType.RequestNewReleases
  };
}
export interface ReceiveNewReleasesAction extends Action {
  type: ActionType.ReceiveNewReleases;
  payload: Album[];
}

function receiveNewReleases(newReleases: Album[]): ReceiveNewReleasesAction {
  return {
    type: ActionType.ReceiveNewReleases,
    payload: newReleases
  };
}

export function getNewReleases() {
  console.log("getNewReleases");
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
