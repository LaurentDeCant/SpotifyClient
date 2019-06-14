import { v4 } from "uuid";
import { FollowingActionType, LibraryActionType } from "../actions";
import createReducer from "./createReducer";

export interface Notification {
  id: string;
  message: string;
}

export interface State extends Array<Notification> {}

const initialState: State = [];

function addNotification(state: State, message: string) {
  return [...state, { id: v4(), message }];
}

export default createReducer(initialState, {
  [FollowingActionType.FollowArtistSuccess]: (state: State) =>
    addNotification(state, "Artist followed"),
  [FollowingActionType.UnfollowArtistSuccess]: (state: State) =>
    addNotification(state, "Artist unfollowed"),
  [FollowingActionType.FollowPlaylistSuccess]: (state: State) =>
    addNotification(state, "Playlist followed"),
  [FollowingActionType.UnfollowPlaylistSuccess]: (state: State) =>
    addNotification(state, "Playlist unfollowed"),
  [LibraryActionType.SaveAlbumSuccess]: (state: State) =>
    addNotification(state, "Album saved"),
  [LibraryActionType.UnsaveAlbumSuccess]: (state: State) =>
    addNotification(state, "Album unsaved"),
  [LibraryActionType.SaveTrackSuccess]: (state: State) =>
    addNotification(state, "Track saved"),
  [LibraryActionType.UnsaveTrackSuccess]: (state: State) =>
    addNotification(state, "Track unsaved")
});
