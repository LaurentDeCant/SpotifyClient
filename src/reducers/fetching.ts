export interface FetchableState {
  fetchs: number;
}

export const startFetching = <S extends FetchableState>(state: S): S => ({
  ...state,
  fetchs: state.fetchs + 1
});

export const endFetching = <S extends FetchableState>(state: S): S => ({
  ...state,
  fetchs: state.fetchs - 1
});

export const isFetching = <S extends FetchableState>(state: S): boolean =>
  state.fetchs !== 0;
