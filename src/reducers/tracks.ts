import merge from "lodash/merge";
import createReducer from "../helpers/reducer";
import { Album, Track } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import { ActionType as AlbumActionType } from "../actions/albums";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { ActionType as SearchActionType } from "../actions/search";
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
  [PlaylistActionType.PlaylistSuccess]: mergeTracks,
  [SearchActionType.SearchSuccess]: mergeTracks
});

export function selectTrack(
  state: CombinedState,
  trackId: string,
  album: Album | undefined = undefined
): Track {
  let track = state.tracks.byId[trackId];

  if (track) {
    track = {
      ...track,
      album: album ? album : selectAlbum(state, track.albumId),
      artists: selectArtists(state, track.artistIds)
    };
  }

  return track;
}

export function selectTracks(
  state: CombinedState,
  trackIds: string[],
  album: Album | undefined = undefined
): Track[] {
  return trackIds ? trackIds.map(id => selectTrack(state, id, album)) : [];
}
