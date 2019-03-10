import browse from "./browse";
import { ActionType } from "../actions/browse";

function randomString() {
  return Math.random().toString();
}

describe("Browse", () => {
  test("Adds a category to an empty list", () => {
    const initialState = { categories: [] };
    const action = {
      type: ActionType.CategorySuccess,
      payload: { id: randomString() }
    };
    const state = browse(initialState, action);

    expect(state.categories).toHaveLength(1);
  });

  test("Adds a category to a non empty list", () => {
    const initialState = { categories: [{ id: randomString() }] };
    const action = {
      type: ActionType.CategorySuccess,
      payload: { id: randomString() }
    };
    const state = browse(initialState, action);

    expect(state.categories).toHaveLength(2);
  });
});
