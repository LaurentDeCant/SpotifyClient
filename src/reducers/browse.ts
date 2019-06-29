import { BrowseActionType as ActionType } from "../actions";
import {
  CategorySuccessAction,
  CategoriesSuccessAction,
  NewReleasesSuccessAction,
  CategoryPlaylistsSuccessAction,
  FeaturedPlaylistsSuccessAction
} from "../actions/browse";
import { CategoryDictionary } from "./types";
import createReducer from "./createReducer";

export interface State {
  categories: CategoryDictionary;
  categoryPlaylistIds: string[];
  featuredPlaylistIds: string[];
  newReleaseIds: string[];
}

export const initialState: State = {
  categories: {},
  categoryPlaylistIds: [],
  featuredPlaylistIds: [],
  newReleaseIds: []
};

export default createReducer(initialState, {
  [ActionType.CategoriesSuccess]: (
    state: State,
    action: CategoriesSuccessAction
  ) => ({
    ...state,
    categories: action.payload.categories
  }),
  [ActionType.CategorySuccess]: (
    state: State,
    action: CategorySuccessAction
  ) => ({
    ...state,
    categories: action.payload.categories
  }),
  [ActionType.CategoryPlaylistsSuccess]: (
    state: State,
    action: CategoryPlaylistsSuccessAction
  ) => ({
    ...state,
    categoryPlaylistIds: Object.keys(action.payload.playlists)
  }),
  [ActionType.FeaturedPlaylistsSuccess]: (
    state: State,
    action: FeaturedPlaylistsSuccessAction
  ) => ({
    ...state,
    featuredPlaylistIds: Object.keys(action.payload.playlists)
  }),
  [ActionType.NewReleasesSuccess]: (
    state: State,
    action: NewReleasesSuccessAction
  ) => ({
    ...state,
    newReleaseIds: Object.keys(action.payload.albums)
  })
});
