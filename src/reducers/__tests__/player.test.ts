import { PlayerActionType } from "../../actions";
import reducer, { initialState, Command } from "../../reducers/player";
import { PlayState } from "../types";

describe("player reducer", () => {
  test("load collection", () => {
    const state = reducer(initialState, {
      type: PlayerActionType.LoadCollection,
      payload: {
        collectionId: "1",
        trackIds: ["1", "2", "3"]
      }
    });

    expect(state.collections).toEqual([{ id: "1" }]);
    expect(state.trackIds).toEqual(["1", "2", "3"]);
    expect(state.currentIndex).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("ended first", () => {
    const state = reducer(
      {
        ...initialState,
        trackIds: ["1", "2", "3"],
        currentIndex: 0,
        isLooped: true
      },
      { type: PlayerActionType.Ended, payload: {} }
    );

    expect(state.currentIndex).toBe(1);
    expect(state.command).toBe(Command.Play);
  });

  test("ended last loop", () => {
    const state = reducer(
      {
        ...initialState,
        trackIds: ["1", "2", "3"],
        currentIndex: 2,
        isLooped: true
      },
      { type: PlayerActionType.Ended, payload: {} }
    );

    expect(state.currentIndex).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("ended last no loop", () => {
    const state = reducer(
      { ...initialState, trackIds: ["1", "2", "3"], currentIndex: 2 },
      { type: PlayerActionType.Ended, payload: {} }
    );

    expect(state.currentIndex).toBe(2);
    expect(state.playState).toBe(PlayState.Paused);
  });

  test("next first", () => {
    const state = reducer(
      { ...initialState, trackIds: ["1", "2", "3"], currentIndex: 0 },
      { type: PlayerActionType.Next, payload: {} }
    );

    expect(state.currentIndex).toBe(1);
    expect(state.command).toBe(Command.Play);
  });

  test("next last", () => {
    const state = reducer(
      { ...initialState, trackIds: ["1", "2", "3"], currentIndex: 2 },
      { type: PlayerActionType.Next, payload: {} }
    );

    expect(state.currentIndex).toBe(0);
    expect(state.command).toBe(Command.Play);
  });

  test("previous first", () => {
    const state = reducer(
      { ...initialState, trackIds: ["1", "2", "3"], currentIndex: 0 },
      { type: PlayerActionType.Previous, payload: {} }
    );

    expect(state.currentIndex).toBe(2);
    expect(state.command).toBe(Command.Play);
  });

  test("previous last", () => {
    const state = reducer(
      { ...initialState, trackIds: ["1", "2", "3"], currentIndex: 2 },
      { type: PlayerActionType.Previous, payload: {} }
    );

    expect(state.currentIndex).toBe(1);
    expect(state.command).toBe(Command.Play);
  });
});
