import { Album, Category, Playlist } from "../types";
import createReducer from "../helpers/createReducer";
import {
  ActionType,
  CategoriesSuccessAction,
  NewReleasesSuccessAction,
  FeaturedPlaylistsSuccessAction,
  CategoryPlaylistsSuccessAction
} from "../actions/browse";
import { State as CombinedState } from ".";

export interface State {
  isFetching: boolean;
  categories: Category[];
  newReleases: Album[];
  featuredPlaylists: Playlist[];
  categoryPlaylists: Playlist[];
}

const initialState: State = {
  isFetching: false,
  categories: [],
  newReleases: [],
  featuredPlaylists: [],
  categoryPlaylists: []
};

export default createReducer(initialState, {
  [ActionType.CategoriesRequest]: (state: State) => ({
    ...state,
    isFetching: true
  }),
  [ActionType.CategoriesSuccess]: (
    state: State,
    action: CategoriesSuccessAction
  ) => ({
    ...state,
    isFetching: false,
    categories: action.payload
  }),
  [ActionType.NewReleasesSuccess]: (
    state: State,
    action: NewReleasesSuccessAction
  ) => ({
    ...state,
    newReleases: action.payload
  }),
  [ActionType.FeaturedPlaylistsSuccess]: (
    state: State,
    action: FeaturedPlaylistsSuccessAction
  ) => ({
    ...state,
    featuredPlaylists: action.payload
  }),
  [ActionType.CategoryPlaylistsSuccess]: (
    state: State,
    action: CategoryPlaylistsSuccessAction
  ) => ({
    ...state,
    categoryPlaylists: action.payload
  })
});

export function selectIsFetching(state: CombinedState): boolean {
  return state.browse.isFetching;
}

export function selectCategories(state: CombinedState): Category[] {
  return state.browse.categories;
}

export function selectCategory(
  state: CombinedState,
  categoryId: string
): Category | undefined {
  return state.browse.categories.find(category => category.id === categoryId);
}

export function selectNewReleases(state: CombinedState): Album[] {
  return state.browse.newReleases;
}

export function selectFeaturedPlaylists(state: CombinedState): Playlist[] {
  return state.browse.featuredPlaylists;
}

export function selectCategoryPlaylists(state: CombinedState): Playlist[] {
  return state.browse.categoryPlaylists;
}
