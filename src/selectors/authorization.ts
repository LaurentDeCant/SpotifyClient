import { State } from "../reducers";

export function selectIsLoggedIn(state: State): boolean {
  return !!state.authorization.isLoggedIn;
}
