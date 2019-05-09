import merge from "lodash/merge";
import { denormalize } from "normalizr";
import { NormalizedTrack, DenormalizedTrack } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { ActionType as AlbumActionType } from "../actions/albums";
import { ActionType as ArtistActionType } from "../actions/artists";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { ActionType as SearchActionType } from "../actions/search";
import { schemas } from "./schemas";

export interface State {
  byId: { [id: string]: NormalizedTrack };
}

const initialState: State = {
  byId: {}
};

function mergeTracks(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.tracks });
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeTracks,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeTracks,
  [PlaylistActionType.PlaylistSuccess]: mergeTracks,
  [SearchActionType.SearchSuccess]: mergeTracks
});

export function selectTrack(
  state: CombinedState,
  trackId: string
): DenormalizedTrack {
  return denormalize(state.tracks.byId[trackId], schemas.track, {
    albums: state.albums.byId,
    artists: state.artists.byId,
    playlists: state.playlists.byId,
    tracks: state.tracks.byId
  });
}

export function selectTracks(
  state: CombinedState,
  trackIds: string[]
): DenormalizedTrack[] {
  return trackIds ? trackIds.map(id => selectTrack(state, id)) : [];
}
