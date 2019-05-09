import {
  DenormalizedAlbum as Album,
  Category,
  DenormalizedPlaylist as Playlist
} from "../types";
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
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { selectPlaylists } from "./playlists";
import { selectAlbums } from "./albums";

export interface State extends FetchableState {
  categoriesById: { [id: string]: Category };
  categoryPlaylistIds: string[];
  featuredPlaylistIds: string[];
  newReleaseIds: string[];
}

const initialState: State = {
  isFetching: false,
  categoriesById: {},
  categoryPlaylistIds: [],
  featuredPlaylistIds: [],
  newReleaseIds: []
};

export default createReducer(initialState, {
  [ActionType.CategoriesRequest]: startFetching,
  [ActionType.CategoriesSuccess]: (
    state: State,
    action: CategoriesSuccessAction
  ): State =>
    endFetching({
      ...state,
      categoriesById: action.payload.categories
    }),
  [ActionType.CategoriesFailure]: endFetching,

  [ActionType.CategoryRequest]: startFetching,
  [ActionType.CategorySuccess]: (
    state: State,
    action: CategorySuccessAction
  ): State =>
    endFetching({
      ...state,
      categoriesById: action.payload.categories
    }),
  [ActionType.CategoryFailure]: endFetching,

  [ActionType.CategoryPlaylistsRequest]: startFetching,
  [ActionType.CategoryPlaylistsSuccess]: (
    state: State,
    action: CategoryPlaylistsSuccessAction
  ): State =>
    endFetching({
      ...state,
      categoryPlaylistIds: Object.keys(action.payload.playlists)
    }),
  [ActionType.CategoryPlaylistsFailure]: endFetching,

  [ActionType.FeaturedPlaylistsRequest]: startFetching,
  [ActionType.FeaturedPlaylistsSuccess]: (
    state: State,
    action: FeaturedPlaylistsSuccessAction
  ): State =>
    endFetching({
      ...state,
      featuredPlaylistIds: Object.keys(action.payload.playlists)
    }),
  [ActionType.FeaturedPlaylistsFailure]: endFetching,

  [ActionType.NewReleasesRequest]: startFetching,
  [ActionType.NewReleasesSuccess]: (
    state: State,
    action: NewReleasesSuccessAction
  ): State =>
    endFetching({
      ...state,
      newReleaseIds: Object.keys(action.payload.albums)
    }),
  [ActionType.NewReleasesFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.browse);
}

export function selectCategories(state: CombinedState): Category[] {
  return Object.values(state.browse.categoriesById);
}

export function selectCategory(
  state: CombinedState,
  categoryId: string
): Category | undefined {
  return state.browse.categoriesById[categoryId];
}

export function selectCategoryPlaylists(state: CombinedState): Playlist[] {
  return selectPlaylists(state, state.browse.categoryPlaylistIds);
}

export function selectFeaturedPlaylists(state: CombinedState): Playlist[] {
  return selectPlaylists(state, state.browse.featuredPlaylistIds);
}

export function selectNewReleases(state: CombinedState): Album[] {
  return selectAlbums(state, state.browse.newReleaseIds);
}
