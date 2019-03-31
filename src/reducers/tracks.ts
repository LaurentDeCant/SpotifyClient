import merge from "lodash/merge";
import createReducer from "../helpers/reducer";
import { Track } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import { ActionType as AlbumActionType } from "../actions/albums";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export interface State {
  byId: { [id: string]: Track };
}

const initialState: State = {
  byId: {}
};

function mergeTracks(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.tracks });
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeTracks,
  [PlaylistActionType.PlaylistSuccess]: mergeTracks
});

export function selectTrack(state: CombinedState, trackId: string): Track {
  const track = state.tracks.byId[trackId];

  if (track) {
    track.album = selectAlbum(state, track.albumId);
    track.artists = selectArtists(state, track.artistIds);
  }

  return track;
}

export function selectTracks(
  state: CombinedState,
  trackIds: string[]
): Track[] {
  return trackIds.map(id => selectTrack(state, id));
}
