import React from "react";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import { render, fireEvent, cleanup } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { ThemeProvider } from "../../styles/styled";
import { darkTheme } from "../../styles/theme";
import { PlayerActionType } from "../../actions";
import { State, initialState } from "../../reducers";
import Controls from "./Controls";

const middlewares = [thunkMiddleware];
const mockStore = configureStore<State>(middlewares);

function renderControls(store: any) {
  return render(
    <ThemeProvider theme={darkTheme}>
      <Provider store={store}>
        <Controls />
      </Provider>
    </ThemeProvider>
  );
}

describe("Controls", () => {
  afterEach(cleanup);

  test(`shuffleButton dispatches ${PlayerActionType.ToggleShuffle}`, () => {
    const store = mockStore(initialState);
    const { getByTestId } = renderControls(store);
    const shuffleButton = getByTestId("shuffleButton");

    fireEvent.click(shuffleButton);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.ToggleShuffle);
  });

  test(`previousButton does not dispatch anything`, () => {
    const store = mockStore(initialState);
    const { getByTestId } = renderControls(store);
    const previousButton = getByTestId("previousButton");

    fireEvent.click(previousButton);

    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });

  test(`playButton does not dispatch anything`, () => {
    const store = mockStore(initialState);
    const { getByTestId } = renderControls(store);
    const playButton = getByTestId("playButton");

    fireEvent.click(playButton);

    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });

  test(`nextButton does not dispatch anything`, () => {
    const store = mockStore(initialState);
    const { getByTestId } = renderControls(store);
    const nextButton = getByTestId("nextButton");

    fireEvent.click(nextButton);

    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });

  test(`loopButton dispatches ${PlayerActionType.ToggleLoop}`, () => {
    const store = mockStore(initialState);
    const { getByTestId } = renderControls(store);
    const loopButton = getByTestId("loopButton");

    fireEvent.click(loopButton);

    const actions = store.getActions();
    expect(actions[0].type).toBe(PlayerActionType.ToggleLoop);
  });
});
