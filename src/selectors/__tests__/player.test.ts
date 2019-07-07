import { initialState } from "../../reducers";
import {
  selectIsLoaded,
  selectIsPlaying,
  selectCanPrevious,
  selectCanNext
} from "../../selectors/player";
import { Type } from "../../types";
import { PlayState } from "../../reducers/types";

describe("player selectors", () => {
  describe("selectIsLoaded", () => {
    test("returns false when collections and tracks are empty", () => {
      const isLoaded = selectIsLoaded({
        ...initialState
      })("a");

      expect(isLoaded).toBeFalsy();
    });

    test("returns false when id is not found", () => {
      const isLoaded = selectIsLoaded({
        ...initialState,
        player: {
          ...initialState.player,
          collections: [{ id: "a", type: Type.Album }],
          playQueue: ["b"]
        }
      })("c");

      expect(isLoaded).toBeFalsy();
    });

    test("returns true when collectionId is found", () => {
      const isLoaded = selectIsLoaded({
        ...initialState,
        player: {
          ...initialState.player,
          collections: [{ id: "a", type: Type.Album }],
          playQueue: ["b"]
        }
      })("a");

      expect(isLoaded).toBeTruthy();
    });

    test("returns true when trackId is found", () => {
      const isLoaded = selectIsLoaded({
        ...initialState,
        player: {
          ...initialState.player,
          collections: [{ id: "a", type: Type.Album }],
          playQueue: ["b"]
        }
      })("b");

      expect(isLoaded).toBeTruthy();
    });
  });

  describe("selectIsPlaying", () => {
    test("returns false player is not playing", () => {
      const isPlaying = selectIsPlaying(initialState);

      expect(isPlaying).toBeFalsy();
    });

    test("returns false when item is not loaded", () => {
      const isPlaying = selectIsPlaying(initialState, "a");

      expect(isPlaying).toBeFalsy();
    });

    test("returns false when item is loaded and player is not playing", () => {
      const isPlaying = selectIsPlaying(
        {
          ...initialState,
          player: { ...initialState.player, playQueue: ["a"] }
        },
        "a"
      );

      expect(isPlaying).toBeFalsy();
    });

    test("returns true when player is playing", () => {
      const isPlaying = selectIsPlaying({
        ...initialState,
        player: { ...initialState.player, playState: PlayState.Playing }
      });

      expect(isPlaying).toBeTruthy();
    });

    test("returns true when item is loaded and player is playing", () => {
      const isPlaying = selectIsPlaying(
        {
          ...initialState,
          player: {
            ...initialState.player,
            playQueue: ["a"],
            playState: PlayState.Playing
          }
        },
        "a"
      );

      expect(isPlaying).toBeTruthy();
    });
  });

  describe("selectCanPrevious", () => {
    test("returns false when there is one track ", () => {
      const canPrevious = selectCanPrevious({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a"]
        }
      });

      expect(canPrevious).toBeFalsy();
    });

    test("returns false when there are many tracks and current is first", () => {
      const canPrevious = selectCanPrevious({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a", "b"],
          currentTrack: 0
        }
      });

      expect(canPrevious).toBeFalsy();
    });

    test("returns true when there are many tracks and current is not first", () => {
      const canPrevious = selectCanPrevious({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a", "b"],
          currentTrack: 1
        }
      });

      expect(canPrevious).toBeTruthy();
    });

    test("returns true when there are many tracks and player is looped", () => {
      const canPrevious = selectCanPrevious({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a", "b"],
          currentTrack: 0,
          isLooped: true
        }
      });

      expect(canPrevious).toBeTruthy();
    });
  });

  describe("selectCanNext", () => {
    test("returns false when there is one track ", () => {
      const canNext = selectCanNext({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a"]
        }
      });

      expect(canNext).toBeFalsy();
    });

    test("returns false when there are many tracks and current is first", () => {
      const canNext = selectCanNext({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a", "b"],
          currentTrack: 1
        }
      });

      expect(canNext).toBeFalsy();
    });

    test("returns true when there are many tracks and current is not first", () => {
      const canNext = selectCanNext({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a", "b"],
          currentTrack: 0
        }
      });

      expect(canNext).toBeTruthy();
    });

    test("returns true when there are many tracks and player is looped", () => {
      const canNext = selectCanNext({
        ...initialState,
        player: {
          ...initialState.player,
          playQueue: ["a", "b"],
          currentTrack: 1,
          isLooped: true
        }
      });

      expect(canNext).toBeTruthy();
    });
  });
});
