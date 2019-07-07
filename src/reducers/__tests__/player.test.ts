import { PlayerActionType } from "../../actions";
import reducer, { initialState, Command } from "../../reducers/player";
import { PlayState } from "../types";

describe("player reducer", () => {
  test("load collection unshuffled", () => {
    const state = reducer(initialState, {
      type: PlayerActionType.LoadCollection,
      payload: {
        collectionId: "1",
        trackIds: ["1", "2", "3"]
      }
    });

    expect(state.collections).toEqual([{ id: "1" }]);
    expect(state.playQueue).toEqual(["1", "2", "3"]);
    expect(state.currentTrack).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("load collection shuffled", () => {
    const state = reducer(
      { ...initialState, isShuffled: true },
      {
        type: PlayerActionType.LoadCollection,
        payload: {
          collectionId: "1",
          trackIds: ["1", "2", "3"]
        }
      }
    );

    expect(state.collections).toEqual([{ id: "1" }]);
    expect(state.playQueue).not.toEqual(["1", "2", "3"]);
    expect(state.currentTrack).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("ended first", () => {
    const state = reducer(
      {
        ...initialState,
        playQueue: ["1", "2", "3"],
        currentTrack: 0,
        isLooped: true
      },
      { type: PlayerActionType.Ended, payload: {} }
    );

    expect(state.currentTrack).toBe(1);
    expect(state.command).toBe(Command.Play);
  });

  test("ended last loop", () => {
    const state = reducer(
      {
        ...initialState,
        playQueue: ["1", "2", "3"],
        currentTrack: 2,
        isLooped: true
      },
      { type: PlayerActionType.Ended, payload: {} }
    );

    expect(state.currentTrack).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("ended last no loop", () => {
    const state = reducer(
      { ...initialState, playQueue: ["1", "2", "3"], currentTrack: 2 },
      { type: PlayerActionType.Ended, payload: {} }
    );

    expect(state.currentTrack).toBe(2);
    expect(state.playState).toBe(PlayState.Paused);
  });

  test("next first", () => {
    const state = reducer(
      { ...initialState, playQueue: ["1", "2", "3"], currentTrack: 0 },
      { type: PlayerActionType.Next, payload: {} }
    );

    expect(state.currentTrack).toBe(1);
    expect(state.command).toBe(Command.Play);
  });

  test("next last", () => {
    const state = reducer(
      { ...initialState, playQueue: ["1", "2", "3"], currentTrack: 2 },
      { type: PlayerActionType.Next, payload: {} }
    );

    expect(state.currentTrack).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("previous first", () => {
    const state = reducer(
      { ...initialState, playQueue: ["1", "2", "3"], currentTrack: 0 },
      { type: PlayerActionType.Previous, payload: {} }
    );

    expect(state.currentTrack).toBe(2);
    expect(state.command).toBe(Command.Play);
  });

  test("previous last", () => {
    const state = reducer(
      { ...initialState, playQueue: ["1", "2", "3"], currentTrack: 2 },
      { type: PlayerActionType.Previous, payload: {} }
    );

    expect(state.currentTrack).toBe(1);
    expect(state.command).toBe(Command.Play);
  });

  test("shuffles play queue", () => {
    const state = reducer(
      {
        ...initialState,
        trackIds: ["1", "2", "3"],
        playQueue: ["1", "2", "3"],
        currentTrack: 0,
        isShuffled: false
      },
      { type: PlayerActionType.ToggleShuffle, payload: {} }
    );

    expect(state.playQueue).not.toEqual(state.trackIds);
    expect(state.playQueue[state.currentTrack]).toBe("1");
  });

  test("unshuffles play queue", () => {
    const state = reducer(
      {
        ...initialState,
        trackIds: ["1", "2", "3"],
        playQueue: ["3", "2", "1"],
        currentTrack: 0,
        isShuffled: true
      },
      { type: PlayerActionType.ToggleShuffle, payload: {} }
    );

    expect(state.playQueue).toEqual(state.trackIds);
    expect(state.playQueue[state.currentTrack]).toBe("3");
  });
});
