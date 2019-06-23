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
  Collection
} from "./types";
import createReducer from "./createReducer";
import { selectTrack, selectTracks } from "./tracks";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

enum PlayerState {
  None = "NONE",
  Playing = "IS_PLAYING",
  Paused = "IS_PAUSED"
}

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
  trackIndex: number;
  playerState: PlayerState;
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
  trackIndex: 0,
  playerState: PlayerState.None,
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
      trackIndex: trackId ? trackIds.indexOf(trackId) : 0,
      command: Command.Play
    };
  },
  [ActionType.LoadTrack]: (state: State, { payload }: LoadTrackAction) => ({
    ...state,
    trackIndex: state.trackIds.indexOf(payload.trackId),
    command: Command.Play
  }),
  [ActionType.TrackLoaded]: (state: State, { payload }: TrackLoadedAction) => ({
    ...state,
    duration: payload
  }),
  [ActionType.Playing]: (state: State) => ({
    ...state,
    playerState: PlayerState.Playing,
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
    playerState: PlayerState.Paused,
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
    const { trackIndex, trackIds } = state;
    return trackIndex === trackIds.length - 1
      ? state.isLooped
        ? { ...state, trackIndex: 0, command: Command.Play }
        : { ...state, playerState: PlayerState.Paused }
      : {
          ...state,
          trackIndex: trackIndex + 1,
          command: Command.Play
        };
  },
  [ActionType.Next]: (state: State) => {
    const { trackIndex, trackIds } = state;
    return {
      ...state,
      trackIndex: trackIndex === trackIds.length - 1 ? 0 : state.trackIndex + 1,
      command: Command.Play
    };
  },
  [ActionType.Previous]: (state: State) => {
    const { trackIndex, trackIds } = state;
    return {
      ...state,
      trackIndex: trackIndex === 0 ? trackIds.length - 1 : state.trackIndex - 1,
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
  const { trackIds, trackIndex } = state.player;
  if (trackIds) {
    return selectTrack(state, trackIds[trackIndex]);
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
  const { collections, trackIds, trackIndex } = state.player;
  return (id: string) =>
    (collections.length && collections[0].id === id) ||
    (!!trackIds.length && trackIds[trackIndex] === id);
}

export function selectIsPlaying(state: CombinedState, id?: string) {
  const { playerState } = state.player;
  return (
    (!id || selectIsLoaded(state)(id)) && playerState === PlayerState.Playing
  );
}

export function selectCanPlayPause(state: CombinedState) {
  const { player } = state;
  return (
    player.playerState !== PlayerState.None &&
    player.currentTime !== player.duration
  );
}

export function selectCanSeek(state: CombinedState) {
  return state.player.playerState !== PlayerState.None;
}

export function selectCanNext(state: CombinedState) {
  const { trackIds, trackIndex, isLooped } = state.player;
  return trackIds.length > 1 && (trackIndex < trackIds.length - 1 || isLooped);
}

export function selectCanPrevious(state: CombinedState) {
  const { trackIds, trackIndex, isLooped } = state.player;
  return trackIds.length > 1 && (trackIndex > 0 || isLooped);
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
