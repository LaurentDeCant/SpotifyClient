import { State } from "../reducers";

export function selectIsLoading(state: State): boolean {
  return !!state.loading.count;
}
