import { Category, Album } from "../types/browse";
import createReducer from "../helpers/createReducer";
import {
  ActionType,
  ReceiveCategoriesAction,
  ReceiveNewReleasesAction
} from "../actions/browse";
import { State as CombinedState } from "./index";

export interface State {
  categories: Category[];
  newReleases: Album[];
}

const initialState: State = {
  categories: [],
  newReleases: []
};

export default createReducer(initialState, {
  [ActionType.ReceiveCategories]: (
    state: State,
    action: ReceiveCategoriesAction
  ) => ({
    ...state,
    categories: action.payload
  }),
  [ActionType.ReceiveNewReleases]: (
    state: State,
    action: ReceiveNewReleasesAction
  ) => ({
    ...state,
    newReleases: action.payload
  })
});

export function selectCategories(state: CombinedState): Category[] {
  return state.browse.categories;
}

export function selectNewReleases(state: CombinedState): Album[] {
  return state.browse.newReleases;
}
