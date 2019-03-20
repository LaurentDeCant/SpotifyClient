import { combineReducers } from "redux";
import albums, { State as AlbumsState } from "./albums";
import artists, { State as ArtistsState } from "./artists";
import authorization, { State as AuthorizationState } from "./authorization";
import browse, { State as BrowseState } from "./browse";
import player, { State as PlayerState } from "./player";
import playlists, { State as PlaylistsState } from "./playlists";
import tracks, { State as TracksState } from "./tracks";
import userProfile, { State as UserProfileState } from "./userProfile";

export interface State {
  albums: AlbumsState;
  artists: ArtistsState;
  authorization: AuthorizationState;
  browse: BrowseState;
  player: PlayerState;
  playlists: PlaylistsState;
  tracks: TracksState;
  userProfile: UserProfileState;
}

export default combineReducers<State>({
  albums,
  artists,
  authorization,
  browse,
  player,
  playlists,
  tracks,
  userProfile
});
