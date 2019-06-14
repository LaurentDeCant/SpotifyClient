import { PayloadAction } from "../actions/types";

export default function createReducer<S>(
  initialState: S,
  handlers: { [key: string]: (state: S, action: PayloadAction) => S }
) {
  return function reducer(state = initialState, action: PayloadAction) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
}
