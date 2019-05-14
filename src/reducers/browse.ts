import { createSelector } from "reselect";
import { Album, Category, Playlist } from "../types";
import {
  ActionType,
  CategorySuccessAction,
  CategoriesSuccessAction,
  NewReleasesSuccessAction,
  CategoryPlaylistsSuccessAction,
  FeaturedPlaylistsSuccessAction
} from "../actions/browse";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectPlaylists } from "./playlists";
import { selectAlbums } from "./albums";

export interface State {
  categories: { [id: string]: Category };
  categoryPlaylistIds: string[];
  featuredPlaylistIds: string[];
  newReleaseIds: string[];
}

const initialState: State = {
  categories: {},
  categoryPlaylistIds: [],
  featuredPlaylistIds: [],
  newReleaseIds: []
};

export default createReducer(initialState, {
  [ActionType.CategoriesSuccess]: (
    state: State,
    action: CategoriesSuccessAction
  ): State => ({
    ...state,
    categories: action.payload.categories
  }),
  [ActionType.CategorySuccess]: (
    state: State,
    action: CategorySuccessAction
  ): State => ({
    ...state,
    categories: action.payload.categories
  }),
  [ActionType.CategoryPlaylistsSuccess]: (
    state: State,
    action: CategoryPlaylistsSuccessAction
  ): State => ({
    ...state,
    categoryPlaylistIds: Object.keys(action.payload.playlists)
  }),
  [ActionType.FeaturedPlaylistsSuccess]: (
    state: State,
    action: FeaturedPlaylistsSuccessAction
  ): State => ({
    ...state,
    featuredPlaylistIds: Object.keys(action.payload.playlists)
  }),
  [ActionType.NewReleasesSuccess]: (
    state: State,
    action: NewReleasesSuccessAction
  ): State => ({
    ...state,
    newReleaseIds: Object.keys(action.payload.albums)
  })
});

export const selectCategories = createSelector(
  ({ browse }: CombinedState) => browse.categories,
  (categories: { [categoryId: string]: Category }) => Object.values(categories)
);

export function selectCategory(
  state: CombinedState,
  categoryId: string
): Category | undefined {
  return state.browse.categories[categoryId];
}

export function selectCategoryPlaylists(state: CombinedState): Playlist[] {
  return selectPlaylists(state)(state.browse.categoryPlaylistIds);
}

export function selectFeaturedPlaylists(state: CombinedState): Playlist[] {
  return selectPlaylists(state)(state.browse.featuredPlaylistIds);
}

export function selectNewReleases(state: CombinedState): Album[] {
  return selectAlbums(state)(state.browse.newReleaseIds);
}
