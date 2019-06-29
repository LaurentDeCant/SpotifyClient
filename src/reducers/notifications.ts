import { v4 } from "uuid";
import { FollowingActionType, LibraryActionType } from "../actions";
import {
  ActionType as NotificationActionType,
  DeleteNotificationAction
} from "../actions/notifications";
import createReducer from "./createReducer";

export interface Notification {
  id: string;
  message: string;
}

export interface State extends Array<Notification> {}

export const initialState: State = [];

function addNotification(state: State, message: string) {
  return [{ id: v4(), message }, ...state];
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
    addNotification(state, "Track unsaved"),
  [NotificationActionType.DeleteNotification]: (
    state: State,
    { payload }: DeleteNotificationAction
  ) => [
    ...state.filter(notification => notification.id !== payload.notificationId)
  ]
});
