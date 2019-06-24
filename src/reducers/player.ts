import { createSelector } from "reselect";
import { Type } from "../types";
import { PlayerActionType as ActionType } from "../actions";
import {
  LoadCollectionAction,
  LoadTrackAction,
  TrackLoadedAction,
  UpdateAction,
  SeekAction,
  ChangeVolumeAction
} from "../actions/player";
import { State as CombinedState } from ".";
import {
  AlbumDictionary,
  ArtistDictionary,
  PlaylistDictionary,
  Collection,
  PlayState
} from "./types";
import createReducer from "./createReducer";
import { selectTrack, selectTracks } from "./tracks";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export enum Command {
  None = "NONE",
  Play = "PLAY",
  Pause = "PAUSE",
  Seek = "SEEK",
  ChangeVolume = "CHANGE_VOLUME"
}

export interface State {
  collections: Collection[];
  trackIds: string[];
  currentIndex: number;
  playState: PlayState;
  duration: number;
  currentTime: number;
  isShuffled: boolean;
  isLooped: boolean;
  volume: number;
  isMuted: boolean;
  command: Command;
}

export const initialState: State = {
  collections: [],
  trackIds: [],
  currentIndex: 0,
  playState: PlayState.None,
  duration: 0,
  currentTime: 0,
  isShuffled: false,
  isLooped: false,
  volume: 1,
  isMuted: false,
  command: Command.None
};

export default createReducer(initialState, {
  [ActionType.LoadCollection]: (
    state: State,
    { payload }: LoadCollectionAction
  ) => {
    const { collectionId, collectionType, trackIds, trackId } = payload;
    return {
      ...state,
      collections: [
        { id: collectionId, type: collectionType },
        ...state.collections.filter(recent => recent.id !== collectionId)
      ],
      trackIds: trackIds,
      currentIndex: trackId ? trackIds.indexOf(trackId) : 0,
      command: Command.Play
    };
  },
  [ActionType.LoadTrack]: (state: State, { payload }: LoadTrackAction) => ({
    ...state,
    currentIndex: state.trackIds.indexOf(payload.trackId),
    command: Command.Play
  }),
  [ActionType.TrackLoaded]: (state: State, { payload }: TrackLoadedAction) => ({
    ...state,
    duration: payload
  }),
  [ActionType.Playing]: (state: State) => ({
    ...state,
    playState: PlayState.Playing,
    command: Command.None
  }),
  [ActionType.Update]: (state: State, { payload }: UpdateAction) => ({
    ...state,
    currentTime: payload,
    command: Command.None
  }),
  [ActionType.Play]: (state: State) => ({
    ...state,
    command: Command.Play
  }),
  [ActionType.Pause]: (state: State) => ({
    ...state,
    command: Command.Pause
  }),
  [ActionType.Paused]: (state: State) => ({
    ...state,
    playState: PlayState.Paused,
    command: Command.None
  }),
  [ActionType.Seek]: (state: State, { payload }: SeekAction) => ({
    ...state,
    currentTime: payload,
    command: Command.Seek
  }),
  [ActionType.Seeked]: (state: State) => ({
    ...state
  }),
  [ActionType.Ended]: (state: State) => {
    const { currentIndex, trackIds } = state;
    return currentIndex === trackIds.length - 1
      ? state.isLooped
        ? { ...state, currentIndex: 0, command: Command.Play }
        : { ...state, playState: PlayState.Paused }
      : {
          ...state,
          currentIndex: currentIndex + 1,
          command: Command.Play
        };
  },
  [ActionType.Next]: (state: State) => {
    const { currentIndex, trackIds } = state;
    return {
      ...state,
      currentIndex:
        currentIndex === trackIds.length - 1 ? 0 : state.currentIndex + 1,
      command: Command.Play
    };
  },
  [ActionType.Previous]: (state: State) => {
    const { currentIndex, trackIds } = state;
    return {
      ...state,
      currentIndex:
        currentIndex === 0 ? trackIds.length - 1 : state.currentIndex - 1,
      command: Command.Play
    };
  },
  [ActionType.ToggleShuffle]: (state: State) => ({
    ...state,
    isShuffled: !state.isShuffled
  }),
  [ActionType.ToggleLoop]: (state: State) => ({
    ...state,
    isLooped: !state.isLooped
  }),
  [ActionType.ChangeVolume]: (
    state: State,
    { payload }: ChangeVolumeAction
  ) => ({
    ...state,
    ...payload,
    command: Command.ChangeVolume
  }),
  [ActionType.VolumeChanged]: (state: State) => ({
    ...state,
    command: Command.None
  })
});

export function selectCollection({ player }: CombinedState) {
  const { collections } = player;
  if (collections.length) {
    return collections[0];
  }
}

export function selectLoadedTrack(state: CombinedState) {
  const { trackIds, currentIndex } = state.player;
  if (trackIds) {
    return selectTrack(state, trackIds[currentIndex]);
  }
}

export function selectLoadedTracks(state: CombinedState) {
  const { trackIds } = state.player;
  return trackIds ? selectTracks(state)(trackIds) : [];
}

export function selectLoadedAlbum(state: CombinedState) {
  const track = selectLoadedTrack(state);
  if (track) {
    return selectAlbum(state, track.album);
  }
}

export function selectLoadedArtists(state: CombinedState) {
  const track = selectLoadedTrack(state);
  return track ? selectArtists(state)(track.artists) : [];
}

export function selectIsLoaded(state: CombinedState) {
  const { collections, trackIds, currentIndex } = state.player;
  return (id: string) =>
    (collections.length && collections[0].id === id) ||
    (!!trackIds.length && trackIds[currentIndex] === id);
}

export function selectIsPlaying(state: CombinedState, id?: string) {
  const { playState } = state.player;
  return (!id || selectIsLoaded(state)(id)) && playState === PlayState.Playing;
}

export function selectCanPlayPause(state: CombinedState) {
  const { player } = state;
  return (
    player.playState !== PlayState.None &&
    player.currentTime !== player.duration
  );
}

export function selectCanSeek(state: CombinedState) {
  return state.player.playState !== PlayState.None;
}

export function selectCanNext(state: CombinedState) {
  const { trackIds, currentIndex, isLooped } = state.player;
  return (
    trackIds.length > 1 && (currentIndex < trackIds.length - 1 || isLooped)
  );
}

export function selectCanPrevious(state: CombinedState) {
  const { trackIds, currentIndex, isLooped } = state.player;
  return trackIds.length > 1 && (currentIndex > 0 || isLooped);
}

export function selectIsShuffled({ player }: CombinedState) {
  return player.isShuffled;
}

export function selectIsLooped({ player }: CombinedState) {
  return player.isLooped;
}

export interface Times {
  duration: number;
  currentTime: number;
}

export const selectTimes = createSelector(
  ({ player }: CombinedState) => player.duration,
  ({ player }: CombinedState) => player.currentTime,
  (duration: number, currentTime: number) => ({
    duration,
    currentTime
  })
);

export function selectVolume({ player }: CombinedState) {
  return player.volume;
}

export function selectIsMuted({ player }: CombinedState) {
  return player.isMuted;
}

export function selectCommand(state: CombinedState): Command {
  return state.player.command;
}

export const selectRecents = createSelector(
  ({ player }: CombinedState) => player,
  ({ albums }: CombinedState) => albums,
  ({ artists }: CombinedState) => artists,
  ({ playlists }: CombinedState) => playlists,
  (
    player: State,
    albums: AlbumDictionary,
    artists: ArtistDictionary,
    playlists: PlaylistDictionary
  ) => {
    return player.collections
      .filter(collection => collection.id)
      .map(collection => {
        switch (collection.type) {
          case Type.Album:
            return albums[collection.id];
          case Type.Artist:
            return artists[collection.id];
          default:
            return playlists[collection.id];
        }
      });
  }
);
