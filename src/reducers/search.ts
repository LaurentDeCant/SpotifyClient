import { Album, Artist, Playlist } from "../types";
import { ActionType, SearchSuccessAction } from "../actions/search";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectAlbums as selectAlbumsById } from "./albums";
import { selectArtists as selectArtistsById } from "./artists";
import { selectPlaylists as selectPlaylistsById } from "./playlists";

export interface State {
  albumIds: string[];
  artistIds: string[];
  playlistIds: string[];
}

const initialState: State = {
  albumIds: [],
  artistIds: [],
  playlistIds: []
};

export default createReducer(initialState, {
  [ActionType.SearchSuccess]: (state: State, action: SearchSuccessAction) => {
    const { results } = action.payload;
    const { albums, artists, playlists } = results[Object.keys(results)[0]];
    return {
      ...state,
      albumIds: albums,
      artistIds: artists,
      playlistIds: playlists
    };
  },
  [ActionType.ClearResults]: () => initialState
});

export function selectAlbums(state: CombinedState): Album[] {
  return selectAlbumsById(state)(state.search.albumIds);
}

export function selectArtists(state: CombinedState): Artist[] {
  return selectArtistsById(state)(state.search.artistIds).sort(
    (x, y) => y.popularity - x.popularity
  );
}

export function selectPlaylists(state: CombinedState): Playlist[] {
  return selectPlaylistsById(state)(state.search.playlistIds);
}
