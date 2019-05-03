import createReducer from "../helpers/reducer";
import { ActionType, SearchSuccessAction } from "../actions/search";
import { Artist, Album, Track } from "../types";
import { State as CombinedState } from ".";
import { selectArtists } from "./artists";
import { selectAlbums } from "./albums";
import { selectTracks } from "./tracks";

export interface State {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

const initialState: State = {
  artistIds: [],
  albumIds: [],
  trackIds: []
};

export default createReducer(initialState, {
  [ActionType.SearchSuccess]: (state: State, action: SearchSuccessAction) => {
    const { artists, albums, tracks } = action.payload;
    return {
      ...state,
      artistIds: Object.keys(artists),
      albumIds: Object.keys(albums),
      trackIds: Object.keys(tracks)
    };
  }
});

export interface Results {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}

export function selectResults(state: CombinedState): Results {
  const { artistIds, albumIds, trackIds } = state.search;
  const artists = selectArtists(state, artistIds);
  const albums = selectAlbums(state, albumIds);
  const tracks = selectTracks(state, trackIds);
  return { artists, albums, tracks };
}
