import { Image, Type } from "../types";
import { SearchActionType as ActionType } from "../actions";
import {
  SearchSuccessAction,
  SelectAlbumAction,
  SelectArtistAction,
  SelectPlaylistAction
} from "../actions/search";
import { getImageSource } from "../utils";
import { Collection } from "./types";
import createReducer from "./createReducer";

export interface State {
  albumIds: string[];
  artistIds: string[];
  playlistIds: string[];
  trackIds: string[];
  recents: Collection[];
}

export const initialState: State = {
  albumIds: [],
  artistIds: [],
  playlistIds: [],
  trackIds: [],
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
  [ActionType.SearchSuccess]: (
    state: State,
    { payload }: SearchSuccessAction
  ) => {
    const { results } = payload;
    const { albums, artists, playlists, tracks } = results[
      Object.keys(results)[0]
    ];
    return {
      ...state,
      albumIds: albums,
      artistIds: artists,
      playlistIds: playlists,
      trackIds: tracks
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
