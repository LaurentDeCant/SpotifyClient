import merge from "lodash/merge";
import createReducer from "../helpers/reducer";
import { Album } from "../types";
import { EntitiesAction } from "../actions/types";
import { ActionType, AlbumSuccessAction } from "../actions/albums";
import { ActionType as BrowseActionType } from "../actions/browse";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { selectArtists } from "./artists";
import { selectTracks } from "./tracks";

export interface State extends FetchableState {
  byId: { [id: string]: Album };
}

const initialState: State = {
  isFetching: false,
  byId: {}
};

function mergeAlbums(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.albums });
}

export default createReducer(initialState, {
  [ActionType.AlbumRequest]: startFetching,
  [ActionType.AlbumSuccess]: (
    state: State,
    action: AlbumSuccessAction
  ): State => endFetching(mergeAlbums(state, action)),
  [ActionType.AlbumFailure]: endFetching,

  [BrowseActionType.NewReleasesSuccess]: mergeAlbums
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.albums);
}

export function selectAlbum(state: CombinedState, albumId: string): Album {
  const album = state.albums.byId[albumId];
  album.artists = selectArtists(state, album.artistIds);
  album.tracks = selectTracks(state, album.trackIds);

  return album;
}

export function selectAlbums(
  state: CombinedState,
  albumIds: string[]
): Album[] {
  return albumIds.map(id => selectAlbum(state, id));
}
