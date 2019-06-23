import configureStore from "redux-mock-store";
import { Type } from "../types";
import { State, initialState } from "../reducers";
import { PlayerActionType } from ".";
import { loadPlayPause } from "./player";
import {
  createAlbum,
  createArtist,
  createPlaylist,
  createTrack
} from "./utils";

const mockStore = configureStore<State>();

describe("loadPlayPause", () => {
  test("loads an album's tracks", () => {
    const store = mockStore({
      ...initialState,
      albums: { "1": { ...createAlbum(), tracks: ["1", "2", "3"] } },
      tracks: { "1": createTrack(), "2": createTrack(), "3": createTrack() }
    });
    loadPlayPause("1", Type.Album)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    const action = actions[0];
    expect(action.type).toBe(PlayerActionType.LoadCollection);
  });

  test("loads an artist's tracks", () => {
    const store = mockStore({
      ...initialState,
      artists: { "1": { ...createArtist(), topTracks: ["1", "2", "3"] } },
      tracks: { "1": createTrack(), "2": createTrack(), "3": createTrack() }
    });
    loadPlayPause("1", Type.Artist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    const action = actions[0];
    expect(action.type).toBe(PlayerActionType.LoadCollection);
  });

  test("loads a library's tracks", () => {
    const store = mockStore({
      ...initialState,
      library: { ...initialState.library, userTrackIds: ["1", "2", "3"] },
      tracks: { "1": createTrack(), "2": createTrack(), "3": createTrack() }
    });
    loadPlayPause("1", Type.Library)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    const action = actions[0];
    expect(action.type).toBe(PlayerActionType.LoadCollection);
  });

  test("loads a playlist's tracks", () => {
    const store = mockStore({
      ...initialState,
      playlists: { "1": { ...createPlaylist(), tracks: ["1", "2", "3"] } },
      tracks: { "1": createTrack(), "2": createTrack(), "3": createTrack() }
    });
    loadPlayPause("1", Type.Playlist)(store.dispatch, store.getState);

    const actions = store.getActions();
    expect(actions).toHaveLength(1);
    const action = actions[0];
    expect(action.type).toBe(PlayerActionType.LoadCollection);
  });
});
