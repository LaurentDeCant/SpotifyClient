import { Action, Dispatch } from "redux";
import Categories from "../types/categories";
import { authorizedFetch } from "../helpers/authorization";

export enum ActionType {
  RequestCategories = "REQUEST_CATEGORIES",
  ReceiveCategories = "RECEIVE_CATEGORIES"
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
  payload: Categories;
}

function receiveCategories(categories: Categories): ReceiveCategoriesAction {
  return {
    type: ActionType.ReceiveCategories,
    payload: categories
  };
}

export function getCategories() {
  return async (
    dispatch: Dispatch<RequestCategoriesAction | ReceiveCategoriesAction>
  ) => {
    dispatch(requestCategories());
    const response = await authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/browse/categories`
    );
    const json = await response.json();
    dispatch(receiveCategories(json));
  };
}
