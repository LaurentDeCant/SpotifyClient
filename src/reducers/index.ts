import { combineReducers } from "redux";
import albums, { State as AlbumsState } from "./albums";
import artists, { State as ArtistsState } from "./artists";
import authorization, { State as AuthorizationState } from "./authorization";
import browse, { State as BrowseState } from "./browse";
import library, { State as LibraryState } from "./library";
import loading, { State as LoadingState } from "./loading";
import player, { State as PlayerState } from "./player";
import playlists, { State as PlaylistsState } from "./playlists";
import search, { State as SearchState } from "./search";
import tracks, { State as TracksState } from "./tracks";
import userProfile, { State as UserProfileState } from "./userProfile";

export interface State {
  albums: AlbumsState;
  artists: ArtistsState;
  authorization: AuthorizationState;
  browse: BrowseState;
  library: LibraryState;
  loading: LoadingState;
  player: PlayerState;
  playlists: PlaylistsState;
  search: SearchState;
  tracks: TracksState;
  userProfile: UserProfileState;
}

export default combineReducers<State>({
  albums,
  artists,
  authorization,
  browse,
  library,
  loading,
  player,
  playlists,
  search,
  tracks,
  userProfile
});
