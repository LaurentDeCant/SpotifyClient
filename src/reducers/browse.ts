import { Category, Album, Playlist } from "../types/browse";
import createReducer from "../helpers/createReducer";
import {
  ActionType,
  ReceiveCategoriesAction,
  ReceiveNewReleasesAction,
  ReceiveFeaturedPlaylistsAction
} from "../actions/browse";
import { State as CombinedState } from "./index";

export interface State {
  categories: Category[];
  newReleases: Album[];
  featuredPlaylists: Playlist[];
}

const initialState: State = {
  categories: [],
  newReleases: [],
  featuredPlaylists: []
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
  })
});

export function selectCategories(state: CombinedState): Category[] {
  return state.browse.categories;
}

export function selectNewReleases(state: CombinedState): Album[] {
  return state.browse.newReleases;
}

export function selectFeaturedPlaylists(state: CombinedState): Playlist[] {
  return state.browse.featuredPlaylists;
}
