import { Dispatch } from "redux";
import { PayloadAction } from "./types";
import { State } from "../reducers";
import { selectIsPlaying, selectIsLoaded } from "../reducers/player";
import {
  selectHasAlbum,
  selectPlayableTrackIds as selectAlbumTrackIds
} from "../reducers/albums";
import {
  selectHasPlaylist,
  selectPlayableTrackIds as selectPlaylistTrackIds
} from "../reducers/playlists";

export enum ActionType {
  LoadCollection = "LOAD_COLLECTION",
  LoadTrack = "LOAD_TRACK",
  TrackLoaded = "TRACK_LOADED",
  Play = "PLAY",
  Playing = "PLAYING",
  Update = "UPDATE",
  Pause = "PAUSE",
  Paused = "PAUSED",
  Seek = "SEEK",
  Seeked = "SEEKED",
  ChangeVolume = "CHANGE_VOLUME",
  VolumeChanged = "VOLUME_CHANGED",
  Ended = "ENDED",
  Next = "NEXT",
  Previous = "PREVIOUS"
}

export interface LoadCollectionAction
  extends PayloadAction<
    ActionType.LoadCollection,
    { collectionId: string; trackIds: string[]; trackId?: string }
  > {}

export function loadCollection(collectionId: string, trackId?: string) {
  return (dispatch: Dispatch<LoadCollectionAction>, getState: () => State) => {
    const state = getState();
    let trackIds = selectHasAlbum(state, collectionId)
      ? selectAlbumTrackIds(state, collectionId)
      : selectHasPlaylist(state, collectionId)
      ? selectPlaylistTrackIds(state, collectionId)
      : [];
    if (trackIds.length) {
      dispatch({
        type: ActionType.LoadCollection,
        payload: {
          collectionId: collectionId,
          trackIds,
          trackId
        }
      });
    }
  };
}

export interface LoadTrackAction
  extends PayloadAction<ActionType.LoadTrack, { trackId: string }> {}

export function loadTrack(trackId: string) {
  return (dispatch: Dispatch<LoadTrackAction>) => {
    dispatch({
      type: ActionType.LoadTrack,
      payload: {
        trackId
      }
    });
  };
}

export interface TrackLoadedAction
  extends PayloadAction<ActionType.TrackLoaded, number> {}

export function trackLoaded(duration: number) {
  return (dispatch: Dispatch<TrackLoadedAction>) => {
    dispatch({
      type: ActionType.TrackLoaded,
      payload: duration
    });
  };
}

function _toggle(dispatch: Dispatch, getState: () => State) {
  const state = getState();
  const isPlaying = selectIsPlaying(state);
  dispatch({
    type: isPlaying() ? ActionType.Pause : ActionType.Play
  });
}

export function toggle(collectionId?: string, trackId?: string) {
  return (dispatch: Dispatch, getState: () => State) => {
    const state = getState();
    const isLoaded = selectIsLoaded(state);
    if (collectionId) {
      if (!isLoaded(collectionId)) {
        loadCollection(collectionId, trackId)(dispatch, getState);
      } else if (trackId && !isLoaded(trackId)) {
        loadTrack(trackId)(dispatch);
      } else {
        _toggle(dispatch, getState);
      }
    } else {
      _toggle(dispatch, getState);
    }
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
  return (dispatch: Dispatch<UpdateAction>) => {
    dispatch({
      type: ActionType.Update,
      payload: elapsed
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
  return (dispatch: Dispatch<SeekAction>) => {
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

export function ended() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Ended });
  };
}

export function next() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Next });
  };
}

export function previous() {
  return (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Previous });
  };
}

export interface ChangeVolumeAction
  extends PayloadAction<
    ActionType.ChangeVolume,
    { volume: number; isMuted: boolean }
  > {}

export function changeVolume(volume: number, isMuted: boolean) {
  return (dispatch: Dispatch<ChangeVolumeAction>) => {
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
