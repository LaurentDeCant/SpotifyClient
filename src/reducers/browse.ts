import { Category, Album, Playlist } from "../types/browse";
import createReducer from "../helpers/createReducer";
import {
  ActionType,
  ReceiveCategoriesAction,
  ReceiveNewReleasesAction,
  ReceiveFeaturedPlaylistsAction,
  ReceiveCategoryPlaylistsAction
} from "../actions/browse";
import { State as CombinedState } from "./index";

export interface State {
  categories: Category[];
  newReleases: Album[];
  featuredPlaylists: Playlist[];
  categoryPlaylists: { [categoryId: string]: Playlist[] };
}

const initialState: State = {
  categories: [],
  newReleases: [],
  featuredPlaylists: [],
  categoryPlaylists: {}
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
  }),
  [ActionType.ReceiveFeaturedPlaylists]: (
    state: State,
    action: ReceiveFeaturedPlaylistsAction
  ) => ({
    ...state,
    featuredPlaylists: action.payload
  }),
  [ActionType.ReceiveCategoryPlaylists]: (
    state: State,
    action: ReceiveCategoryPlaylistsAction
  ) => {
    const { categoryId, playlists } = action.payload;
    return {
      ...state,
      categoryPlaylists: {
        ...state.categoryPlaylists,
        [categoryId]: playlists
      }
    };
  }
});

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

export function selectCategoryPlaylist(
  state: CombinedState,
  categoryId: string
): Playlist[] {
  return state.browse.categoryPlaylists[categoryId] || [];
}
