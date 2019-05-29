import { Album, Artist, Playlist, Image } from "../types";
import { SearchActionType as ActionType } from "../actions";
import {
  SearchSuccessAction,
  SelectAlbumAction,
  SelectArtistAction,
  SelectPlaylistAction
} from "../actions/search";
import { getImageSource } from "../utils";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectAlbums as selectAlbumsById } from "./albums";
import { selectArtists as selectArtistsById } from "./artists";
import { selectPlaylists as selectPlaylistsById } from "./playlists";

export enum RecentType {
  Album = "ALBUM",
  Artist = "ARTIST",
  Playlist = "PLAYLIST"
}

export interface Recent {
  type: RecentType;
  id: string;
  name: string;
  imageSource: string;
}

export interface State {
  albumIds: string[];
  artistIds: string[];
  playlistIds: string[];
  recents: Recent[];
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
  type: RecentType
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
    addRecent(state, payload, RecentType.Album),
  [ActionType.SelectArtist]: (state: State, { payload }: SelectArtistAction) =>
    addRecent(state, payload, RecentType.Artist),
  [ActionType.SelectPlaylist]: (
    state: State,
    { payload }: SelectPlaylistAction
  ) => addRecent(state, payload, RecentType.Playlist),
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

export function selectRecents({ search }: CombinedState): Recent[] {
  return search.recents;
}
