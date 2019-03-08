import { combineReducers } from "redux";
import authorization, { State as AuthorizationState } from "./authorization";
import userProfile, { State as UserProfileState } from "./userProfile";
import browse, { State as BrowseState } from "./browse";
import playlists, { State as PlaylistsState } from "./playlists";
import albums, { State as AlbumsState } from "./albums";

export interface State {
  authorization: AuthorizationState;
  userProfile: UserProfileState;
  browse: BrowseState;
  playlists: PlaylistsState;
  albums: AlbumsState;
}

export default combineReducers<State>({
  authorization,
  userProfile,
  browse,
  playlists,
  albums
});
