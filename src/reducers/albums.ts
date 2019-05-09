import merge from "lodash/merge";
import { denormalize } from "normalizr";
import { NormalizedAlbum, DenormalizedAlbum } from "../types";
import { EntitiesAction } from "../actions/types";
import { ActionType, AlbumSuccessAction } from "../actions/albums";
import { ActionType as ArtistActionType } from "../actions/artists";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { ActionType as BrowseActionType } from "../actions/browse";
import { ActionType as SearchActionType } from "../actions/search";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { schemas } from "./schemas";

export interface State extends FetchableState {
  byId: { [id: string]: NormalizedAlbum };
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
  [PlaylistActionType.PlaylistSuccess]: mergeAlbums,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeAlbums,
  [BrowseActionType.NewReleasesSuccess]: mergeAlbums,
  [SearchActionType.SearchSuccess]: mergeAlbums
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.albums);
}

export function selectHasAlbum(state: CombinedState, albumId: string): boolean {
  return !!state.albums.byId[albumId];
}

export function selectAlbum(
  state: CombinedState,
  albumId: string
): DenormalizedAlbum {
  return denormalize(state.albums.byId[albumId], schemas.album, {
    albums: state.albums.byId,
    artists: state.artists.byId,
    playlists: state.playlists.byId,
    tracks: state.tracks.byId
  });
}

export function selectAlbums(
  state: CombinedState,
  albumIds: string[]
): DenormalizedAlbum[] {
  return albumIds ? albumIds.map(id => selectAlbum(state, id)) : [];
}

export function selectPlayableTrackIds(
  state: CombinedState,
  albumId: string
): string[] {
  const album = selectAlbum(state, albumId);
  return album.tracks.filter(track => track.preview_url).map(track => track.id);
}
