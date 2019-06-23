import { Dispatch } from "redux";
import { Type } from "../types";
import { State } from "../reducers";
import { selectIsPlaying, selectIsLoaded } from "../reducers/player";
import { selectPlayableTracks as selectAlbumTracks } from "../reducers/albums";
import { selectPlayableTracks as selectArtistTracks } from "../reducers/artists";
import { selectPlayableTracks as selectPlaylistTracks } from "../reducers/playlists";
import { selectPlayableTracks as selectLibraryTracks } from "../reducers/library";
import { PlayerActionType as ActionType } from ".";
import { PayloadAction } from "./types";

export interface LoadCollectionAction
  extends PayloadAction<
    ActionType.LoadCollection,
    {
      collectionId: string;
      collectionType: Type;
      trackIds: string[];
      trackId?: string;
    }
  > {}

const providers = {
  [Type.Album]: selectAlbumTracks,
  [Type.Artist]: selectArtistTracks,
  [Type.Playlist]: selectPlaylistTracks,
  [Type.Library]: selectLibraryTracks
};

function getTrackIds(
  state: State,
  collectionId: string,
  collectionType: Type
): string[] {
  return providers[collectionType](state, collectionId).map(track => track.id);
}

export function loadCollection(
  collectionId: string,
  collectionType: Type,
  trackId?: string
) {
  return (dispatch: Dispatch<LoadCollectionAction>, getState: () => State) => {
    const state = getState();
    const trackIds = getTrackIds(state, collectionId, collectionType);
    if (trackIds.length) {
      dispatch({
        type: ActionType.LoadCollection,
        payload: {
          collectionId: collectionId,
          collectionType: collectionType,
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

export function playPause() {
  return (dispatch: Dispatch, getState: () => State) => {
    const state = getState();
    const isPlaying = selectIsPlaying(state);
    dispatch({
      type: isPlaying ? ActionType.Pause : ActionType.Play
    });
  };
}

export function loadPlayPause(
  collectionId: string,
  collectionType: Type,
  trackId?: string
) {
  return (dispatch: Dispatch, getState: () => State) => {
    const state = getState();
    const isLoaded = selectIsLoaded(state);
    if (!isLoaded(collectionId)) {
      loadCollection(collectionId, collectionType, trackId)(dispatch, getState);
    } else if (trackId && !isLoaded(trackId)) {
      loadTrack(trackId)(dispatch);
    } else {
      playPause()(dispatch, getState);
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

export function toggleShuffle() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.ToggleShuffle
    });
  };
}

export function toggleLoop() {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionType.ToggleLoop
    });
  };
}
