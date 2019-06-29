import { initialState } from "../../reducers";
import {
  selectIsLoaded,
  selectIsPlaying,
  selectCanPrevious,
  selectCanNext
} from "../../selectors/player";

describe("player selectors", () => {
  test("selectIsLaded", () => {
    const isLoaded = selectIsLoaded(initialState)("");
  });

  test("selectIsPlaying", () => {
    const isPlaying = selectIsPlaying(initialState);
  });

  test("selectCanPrevious", () => {
    const canPrevious = selectCanPrevious(initialState);
  });

  test("selectCanNext", () => {
    const canNext = selectCanNext(initialState);
  });
});
