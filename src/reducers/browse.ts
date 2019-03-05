import Categories, { Category } from "../types/browse";
import createReducer from "../helpers/createReducer";
import { ActionType, ReceiveCategoriesAction } from "../actions/browse";

export interface State {
  categories?: Categories;
}

const initialState: State = {
  categories: undefined
};

export default createReducer(initialState, {
  [ActionType.ReceiveCategories]: (
    state: State,
    action: ReceiveCategoriesAction
  ) => ({
    ...state,
    categories: action.payload
  })
});

export function selectCategories(state: { browse: State }): Category[] {
  const categories = state.browse.categories;
  return categories ? categories.items : [];
}
