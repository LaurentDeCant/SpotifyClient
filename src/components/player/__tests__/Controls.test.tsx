import React from "react";
import { Provider } from "react-redux";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "jest-dom/extend-expect";
import { ThemeProvider } from "../../../styles/styled";
import { darkTheme } from "../../../styles/theme";
import {
  toggleShuffle,
  previous,
  playPause,
  next,
  toggleLoop
} from "../../../actions/player";
import {
  selectCanPrevious,
  selectCanPlayPause,
  selectCanNext
} from "../../../selectors/player";
import Controls from "../Controls";

jest.mock("../../../actions/player");
jest.mock("../../../selectors/player");

function renderControls() {
  const store = {
    dispatch: jest.fn(),
    getState: jest.fn(),
    subscribe: jest.fn(),
    replaceReducer: jest.fn()
  };

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

  test("shuffleButton calls toggleShuffle", () => {
    const { getByTestId } = renderControls();
    const shuffleButton = getByTestId("shuffleButton");

    fireEvent.click(shuffleButton);
    expect(toggleShuffle).toHaveBeenCalled();
  });

  test("previousButton is disabled", () => {
    const { getByTestId } = renderControls();
    const previousButton = getByTestId("previousButton");

    expect(previousButton).toBeDisabled();
  });

  test("previousButton calls previous", () => {
    //@ts-ignore
    selectCanPrevious.mockReturnValue(true);
    const { getByTestId } = renderControls();
    const previousButton = getByTestId("previousButton");

    fireEvent.click(previousButton);
    expect(previous).toHaveBeenCalled();
  });

  test("playButton is disabled", () => {
    const { getByTestId } = renderControls();
    const playButton = getByTestId("playButton");

    expect(playButton).toBeDisabled();
  });

  test("playButton calls playPause", () => {
    //@ts-ignore
    selectCanPlayPause.mockReturnValue(true);
    const { getByTestId } = renderControls();
    const playButton = getByTestId("playButton");

    fireEvent.click(playButton);
    expect(playPause).toHaveBeenCalled();
  });

  test("nextButton is disabled", () => {
    const { getByTestId } = renderControls();
    const nextButton = getByTestId("nextButton");

    expect(nextButton).toBeDisabled();
  });

  test("nextButton calls previous", () => {
    //@ts-ignore
    selectCanNext.mockReturnValue(true);
    const { getByTestId } = renderControls();
    const nextButton = getByTestId("nextButton");

    fireEvent.click(nextButton);
    expect(next).toHaveBeenCalled();
  });

  test("loopButton to calls toggleLoop", () => {
    const { getByTestId } = renderControls();
    const loopButton = getByTestId("loopButton");

    fireEvent.click(loopButton);
    expect(toggleLoop).toHaveBeenCalled();
  });
});
