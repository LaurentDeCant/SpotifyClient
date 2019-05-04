import createReducer from "../helpers/reducer";
import { ActionType, SearchSuccessAction } from "../actions/search";
import { Album, Artist, Playlist, Track } from "../types";
import { State as CombinedState } from ".";
import {
  FetchableState,
  startFetching,
  endFetching,
  isFetching
} from "./fetching";
import { selectAlbums } from "./albums";
import { selectArtists } from "./artists";
import { selectPlaylists } from "./playlists";
import { selectTracks } from "./tracks";

export interface State extends FetchableState {
  albumIds: string[];
  artistIds: string[];
  playlistIds: string[];
  trackIds: string[];
}

const initialState: State = {
  isFetching: false,
  albumIds: [],
  artistIds: [],
  playlistIds: [],
  trackIds: []
};

export default createReducer(initialState, {
  [ActionType.SearchRequest]: startFetching,
  [ActionType.SearchSuccess]: (state: State, action: SearchSuccessAction) => {
    const { albums, artists, playlists, tracks } = action.payload;
    console.log(action);
    return endFetching({
      ...state,
      albumIds: albums ? Object.keys(albums) : [],
      artistIds: artists ? Object.keys(artists) : [],
      playlistIds: playlists ? Object.keys(playlists) : [],
      trackIds: tracks ? Object.keys(tracks) : []
    });
  },
  [ActionType.SearchFailure]: endFetching
});

export function selectIsFetching(state: CombinedState): boolean {
  return isFetching(state.search);
}

export interface Results {
  albums: Album[];
  artists: Artist[];
  playlists: Playlist[];
  tracks: Track[];
}

export function selectResults(state: CombinedState): Results {
  const { albumIds, artistIds, playlistIds, trackIds } = state.search;
  const albums = selectAlbums(state, albumIds);
  const artists = selectArtists(state, artistIds);
  const playlists = selectPlaylists(state, playlistIds);
  const tracks = selectTracks(state, trackIds);
  return { artists, albums, playlists, tracks };
}
