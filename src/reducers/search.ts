import { Album, Artist, Playlist, Image, Type } from "../types";
import { SearchActionType as ActionType } from "../actions";
import {
  SearchSuccessAction,
  SelectAlbumAction,
  SelectArtistAction,
  SelectPlaylistAction
} from "../actions/search";
import { getImageSource } from "../utils";
import { State as CombinedState } from ".";
import { Collection } from "./types";
import createReducer from "./createReducer";
import { selectAlbums as selectAlbumsById, selectAlbum } from "./albums";
import { selectArtists as selectArtistsById, selectArtist } from "./artists";
import {
  selectPlaylists as selectPlaylistsById,
  selectPlaylist
} from "./playlists";

export interface State {
  albumIds: string[];
  artistIds: string[];
  playlistIds: string[];
  recents: Collection[];
}

const initialState: State = {
  albumIds: [],
  artistIds: [],
  playlistIds: [],
  recents: []
};

function addRecent(
  state: State,
  item: { id: string; name: string; images: Image[] },
  type: Type
) {
  return {
    ...state,
    recents: [
      { type, id: item.id, name: item.name, imageSource: getImageSource(item) },
      ...state.recents.filter(recent => recent.id !== item.id)
    ]
  };
}

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
  [ActionType.ClearResults]: (state: State) => ({
    ...state,
    albumIds: [],
    artistIds: [],
    playlistIds: []
  }),
  [ActionType.SelectAlbum]: (state: State, { payload }: SelectAlbumAction) =>
    addRecent(state, payload, Type.Album),
  [ActionType.SelectArtist]: (state: State, { payload }: SelectArtistAction) =>
    addRecent(state, payload, Type.Artist),
  [ActionType.SelectPlaylist]: (
    state: State,
    { payload }: SelectPlaylistAction
  ) => addRecent(state, payload, Type.Playlist),
  [ActionType.ClearRecents]: (state: State) => ({
    ...state,
    recents: []
  })
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

export function selectRecents(
  state: CombinedState
): (Album | Artist | Playlist)[] {
  return state.search.recents.map(recent => {
    switch (recent.type) {
      case Type.Album:
        return selectAlbum(state, recent.id);
      case Type.Artist:
        return selectArtist(state, recent.id);
      default:
        return selectPlaylist(state, recent.id);
    }
  });
}
