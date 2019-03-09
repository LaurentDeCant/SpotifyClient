import { State } from ".";

export const startFetching = (state: State) => ({
  ...state,
  isFetching: true
});

export const endFetching = (state: State) => ({
  ...state,
  isFetching: false
});
