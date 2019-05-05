import merge from "lodash/merge";
import { Artist } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { ActionType as AlbumActionType } from "../actions/albums";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { ActionType as BrowseActionType } from "../actions/browse";
import { ActionType as SearchActionType } from "../actions/search";

export interface State {
  byId: { [id: string]: Artist };
}

const initialState: State = {
  byId: {}
};

function mergeArtists(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.artists });
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeArtists,
  [PlaylistActionType.PlaylistSuccess]: mergeArtists,
  [BrowseActionType.NewReleasesSuccess]: mergeArtists,
  [SearchActionType.SearchSuccess]: mergeArtists
});

export function selectArtist(state: CombinedState, artistId: string): Artist {
  return state.artists.byId[artistId];
}

export function selectArtists(
  state: CombinedState,
  artistIds: string[]
): Artist[] {
  return artistIds ? artistIds.map(id => selectArtist(state, id)) : [];
}
