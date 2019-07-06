import { createSelector } from "reselect";
import { Type } from "../types";
import { State } from "../reducers";
import {
  AlbumDictionary,
  ArtistDictionary,
  PlaylistDictionary,
  PlayState,
  Collection
} from "../reducers/types";
import { Command } from "../reducers/player";
import { selectTrack, selectTracks } from "./tracks";
import { selectAlbum } from "./albums";
import { selectArtists } from "./artists";

export function selectCollection({ player }: State) {
  const { collections } = player;
  if (collections.length) {
    return collections[0];
  }
}

export function selectLoadedTrack(state: State) {
  const { trackIds, currentIndex } = state.player;
  if (trackIds) {
    return selectTrack(state, trackIds[currentIndex]);
  }
}

export function selectLoadedTracks(state: State) {
  const { trackIds } = state.player;
  return trackIds ? selectTracks(state)(trackIds) : [];
}

export function selectLoadedAlbum(state: State) {
  const track = selectLoadedTrack(state);
  if (track) {
    return selectAlbum(state, track.album);
  }
}

export function selectLoadedArtists(state: State) {
  const track = selectLoadedTrack(state);
  return track ? selectArtists(state)(track.artists) : [];
}

export function selectIsLoaded(state: State) {
  const { collections, trackIds, currentIndex } = state.player;
  return (id: string) =>
    (!!collections.length && collections[0].id === id) ||
    (!!trackIds.length && trackIds[currentIndex] === id);
}

export function selectIsPlaying(state: State, id?: string) {
  const { playState } = state.player;
  return (!id || selectIsLoaded(state)(id)) && playState === PlayState.Playing;
}

export function selectCanPlayPause(state: State) {
  const { player } = state;
  return (
    player.playState !== PlayState.None &&
    player.currentTime !== player.duration
  );
}

export function selectCanSeek(state: State) {
  return state.player.playState !== PlayState.None;
}

export function selectCanPrevious(state: State) {
  const { trackIds, currentIndex, isLooped } = state.player;
  return trackIds.length > 1 && (currentIndex > 0 || isLooped);
}

export function selectCanNext(state: State) {
  const { trackIds, currentIndex, isLooped } = state.player;
  return (
    trackIds.length > 1 && (currentIndex < trackIds.length - 1 || isLooped)
  );
}

export function selectIsShuffled({ player }: State) {
  return player.isShuffled;
}

export function selectIsLooped({ player }: State) {
  return player.isLooped;
}

export interface Times {
  duration: number;
  currentTime: number;
}

export const selectTimes = createSelector(
  ({ player }: State) => player.duration,
  ({ player }: State) => player.currentTime,
  (duration: number, currentTime: number) => ({
    duration,
    currentTime
  })
);

export function selectVolume({ player }: State) {
  return player.volume;
}

export function selectIsMuted({ player }: State) {
  return player.isMuted;
}

export function selectCommand(state: State): Command {
  return state.player.command;
}

export const selectRecents = createSelector(
  ({ player }: State) => player.collections,
  ({ albums }: State) => albums,
  ({ artists }: State) => artists,
  ({ playlists }: State) => playlists,
  (
    collections: Collection[],
    albums: AlbumDictionary,
    artists: ArtistDictionary,
    playlists: PlaylistDictionary
  ) => {
    return collections
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
