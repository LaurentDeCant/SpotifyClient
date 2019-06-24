import configureStore from "redux-mock-store";
import { Type } from "../types";
import { State, initialState } from "../reducers";
import { PlayState } from "../reducers/types";
import { PlayerActionType } from ".";
import { loadPlayPause } from "./player";
import {
  createAlbum,
  createArtist,
  createPlaylist,
  createTrack
} from "./utils";

const mockStore = configureStore<State>();

const albumId = "1";
const artistId = "2";
const libraryId = "3";
const playlistId = "4";

function createStore({ player } = { player: {} }) {
  return mockStore({
    ...initialState,
    albums: {
      [albumId]: { ...createAlbum(), tracks: ["1", "2", "3"] }
    },
    artists: {
      [artistId]: { ...createArtist(), topTracks: ["1", "2", "3"] }
    },
    library: { ...initialState.library, userTrackIds: ["1", "2", "3"] },
    playlists: {
      [playlistId]: { ...createPlaylist(), tracks: ["1", "2", "3"] }
    },
    tracks: { "1": createTrack(), "2": createTrack(), "3": createTrack() },
    player: { ...initialState.player, ...player }
  });
}

describe("player actions", () => {
  test("loads an album", () => {
    const store = createStore();
    loadPlayPause(albumId, Type.Album)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.LoadCollection);
  });

  test("plays an album", () => {
    const store = createStore({
      player: { collections: [{ id: albumId }] }
    });
    loadPlayPause(albumId, Type.Album)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Play);
  });

  test("pauses an album", () => {
    const store = createStore({
      player: {
        collections: [{ id: albumId }],
        playState: PlayState.Playing
      }
    });
    loadPlayPause(albumId, Type.Album)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Pause);
  });

  test("loads an artist", () => {
    const store = createStore();
    loadPlayPause(artistId, Type.Artist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.LoadCollection);
  });

  test("plays an artist", () => {
    const store = createStore({
      player: { collections: [{ id: artistId }] }
    });
    loadPlayPause(artistId, Type.Artist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Play);
  });

  test("pauses an artist", () => {
    const store = createStore({
      player: {
        collections: [{ id: artistId }],
        playState: PlayState.Playing
      }
    });
    loadPlayPause(artistId, Type.Artist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Pause);
  });

  test("loads a library", () => {
    const store = createStore();
    loadPlayPause(libraryId, Type.Library)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.LoadCollection);
  });

  test("plays a library", () => {
    const store = createStore({
      player: { collections: [{ id: libraryId }] }
    });
    loadPlayPause(libraryId, Type.Library)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Play);
  });

  test("pauses a library", () => {
    const store = createStore({
      player: {
        collections: [{ id: libraryId }],
        playState: PlayState.Playing
      }
    });
    loadPlayPause(libraryId, Type.Library)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Pause);
  });

  test("loads a playlist", () => {
    const store = createStore();
    loadPlayPause(playlistId, Type.Playlist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.LoadCollection);
  });

  test("plays a playlist", () => {
    const store = createStore({
      player: { collections: [{ id: playlistId }] }
    });
    loadPlayPause(playlistId, Type.Playlist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Play);
  });

  test("pauses a playlist", () => {
    const store = createStore({
      player: {
        collections: [{ id: playlistId }],
        playState: PlayState.Playing
      }
    });
    loadPlayPause(playlistId, Type.Playlist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.Pause);
  });
});
