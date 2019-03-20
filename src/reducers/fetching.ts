export interface FetchableState {
  isFetching: boolean;
}

export const startFetching = <S extends FetchableState>(state: S): S => ({
  ...state,
  isFetching: true
});

export const endFetching = <S extends FetchableState>(state: S): S => ({
  ...state,
  isFetching: false
});

export const isFetching = <S extends FetchableState>(state: S): boolean =>
  state.isFetching;
