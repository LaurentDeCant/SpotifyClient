import { Album, Category, Playlist } from "../types";
import createReducer from "../helpers/reducer";
import {
  ActionType,
  CategorySuccessAction,
  CategoriesSuccessAction,
  NewReleasesSuccessAction,
  CategoryPlaylistsSuccessAction,
  FeaturedPlaylistsSuccessAction
} from "../actions/browse";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";

export interface State extends FetchableState {
  categories: Category[];
  newReleases: Album[];
  featuredPlaylists: Playlist[];
  categoryPlaylists: Playlist[];
}

const initialState: State = {
  fetchs: 0,
  categories: [],
  newReleases: [],
  featuredPlaylists: [],
  categoryPlaylists: []
};

export default createReducer(initialState, {
  [ActionType.CategoriesRequest]: startFetching,
  [ActionType.CategoriesSuccess]: (
    state: State,
    action: CategoriesSuccessAction
  ) =>
    endFetching({
      ...state,
      categories: action.payload
    }),
  [ActionType.CategoriesFailure]: endFetching,

  [ActionType.CategoryRequest]: startFetching,
  [ActionType.CategorySuccess]: (state: State, action: CategorySuccessAction) =>
    endFetching({
      ...state,
      categories: [...state.categories, action.payload]
    }),
  [ActionType.CategoryFailure]: endFetching,

  [ActionType.NewReleasesRequest]: startFetching,
  [ActionType.NewReleasesSuccess]: (
    state: State,
    action: NewReleasesSuccessAction
  ) =>
    endFetching({
      ...state,
      newReleases: action.payload
    }),
  [ActionType.NewReleasesFailure]: endFetching,

  [ActionType.FeaturedPlaylistsRequest]: startFetching,
  [ActionType.FeaturedPlaylistsSuccess]: (
    state: State,
    action: FeaturedPlaylistsSuccessAction
  ) =>
    endFetching({
      ...state,
      featuredPlaylists: action.payload
    }),
  [ActionType.FeaturedPlaylistsFailure]: endFetching,

  [ActionType.CategoryPlaylistsRequest]: startFetching,
  [ActionType.CategoryPlaylistsSuccess]: (
    state: State,
    action: CategoryPlaylistsSuccessAction
  ) =>
    endFetching({
      ...state,
      categoryPlaylists: action.payload
    }),
  [ActionType.CategoryPlaylistsFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.browse);
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
