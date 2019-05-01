import { Dispatch } from "redux";
import { PayloadAction } from "./types";
import { State } from "../reducers";
import { selectIsPlaying } from "../reducers/player";
import { selectPlayableTrackIds as selectAlbumTrackIds } from "../reducers/albums";
import { selectPlayableTrackIds as selectPlaylistTrackIds } from "../reducers/playlists";

export enum ActionType {
  LoadTrack = "LOAD_TRACK",
  TrackLoaded = "TRACK_LOADED",
  Playing = "PLAYING",
  Update = "UPDATE",
  Play = "PLAY",
  Pause = "PAUSE",
  Paused = "PAUSED",
  Seek = "SEEK",
  Seeked = "SEEKED",
  ChangeVolume = "CHANGE_VOLUME",
  VolumeChanged = "VOLUME_CHANGED",
  LoadCollection = "LOAD_COLLECTION",
  Ended = "ENDED"
}

export interface LoadTrackAction
  extends PayloadAction<ActionType.LoadTrack, string> {}

export function loadTrack(trackId: string) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.LoadTrack,
      payload: trackId
    });
  };
}

export interface TrackLoadedAction
  extends PayloadAction<ActionType.TrackLoaded, number> {}

export function trackLoaded(duration: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.TrackLoaded,
      payload: duration
    });
  };
}

export function playing() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Playing
    });
  };
}

export interface UpdateAction
  extends PayloadAction<ActionType.Update, number> {}

export function update(elapsed: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Update,
      payload: elapsed
    });
  };
}

export function toggle() {
  return (dispatch: Dispatch, getState: () => State) => {
    const isPlaying = selectIsPlaying(getState());
    dispatch({
      type: isPlaying() ? ActionType.Pause : ActionType.Play
    });
  };
}

export function paused() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Paused
    });
  };
}

export interface SeekAction extends PayloadAction<ActionType.Seek, number> {}

export function seek(time: number) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Seek,
      payload: time
    });
  };
}

export function seeked() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.Seeked
    });
  };
}

export interface ChangeVolumeAction
  extends PayloadAction<ActionType.ChangeVolume, string[]> {}

export function changeVolume(volume: number, isMuted: boolean) {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.ChangeVolume,
      payload: {
        volume,
        isMuted
      }
    });
  };
}

export function volumeChanged() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.VolumeChanged
    });
  };
}

export interface LoadCollectionAction
  extends PayloadAction<
    ActionType.ChangeVolume,
    { collectionId: string; trackIds: string[] }
  > {}

export function loadAlbum(albumId: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    const trackIds = selectAlbumTrackIds(getState(), albumId);
    dispatch({
      type: ActionType.LoadCollection,
      payload: {
        collectionId: albumId,
        trackIds
      }
    });
  };
}

export function loadPlaylist(playlistId: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    const trackIds = selectPlaylistTrackIds(getState(), playlistId);
    dispatch({
      type: ActionType.LoadCollection,
      payload: {
        collectionId: playlistId,
        trackIds
      }
    });
  };
}

export function ended() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Ended });
  };
}
