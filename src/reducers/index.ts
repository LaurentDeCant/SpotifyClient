import { combineReducers } from "redux";
import * as albums from "./albums";
import * as artists from "./artists";
import * as authorization from "./authorization";
import * as browse from "./browse";
import * as following from "./following";
import * as library from "./library";
import * as loading from "./loading";
import * as notifications from "./notifications";
import * as player from "./player";
import * as playlists from "./playlists";
import * as search from "./search";
import * as tracks from "./tracks";
import * as userProfile from "./userProfile";

export interface State {
  albums: albums.State;
  artists: artists.State;
  authorization: authorization.State;
  browse: browse.State;
  following: following.State;
  library: library.State;
  loading: loading.State;
  notifications: notifications.State;
  player: player.State;
  playlists: playlists.State;
  search: search.State;
  tracks: tracks.State;
  userProfile: userProfile.State;
}

export const initialState = {
  albums: albums.initialState,
  artists: artists.initialState,
  authorization: authorization.initialState,
  browse: browse.initialState,
  following: following.initialState,
  library: library.initialState,
  loading: loading.initialState,
  notifications: notifications.initialState,
  player: player.initialState,
  playlists: playlists.initialState,
  search: search.initialState,
  tracks: tracks.initialState,
  userProfile: userProfile.initialState
};

export default combineReducers<State>({
  albums: albums.default,
  artists: artists.default,
  authorization: authorization.default,
  browse: browse.default,
  following: following.default,
  library: library.default,
  loading: loading.default,
  notifications: notifications.default,
  player: player.default,
  playlists: playlists.default,
  search: search.default,
  tracks: tracks.default,
  userProfile: userProfile.default
});
