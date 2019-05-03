import createReducer from "../helpers/reducer";
import { ActionType, SearchSuccessAction } from "../actions/search";
import { State as CombinedState } from ".";

export interface State {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

const initialState: State = {
  artistIds: [],
  albumIds: [],
  trackIds: []
};

export default createReducer(initialState, {
  [ActionType.SearchSuccess]: (state: State, action: SearchSuccessAction) => {
    const { artists, albums, tracks } = action.payload;
    return {
      ...state,
      artistIds: Object.keys(artists),
      albumIds: Object.keys(albums),
      trackIds: Object.keys(tracks)
    };
  }
});

export interface Results {
  artistIds: string[];
  albumIds: string[];
  trackIds: string[];
}

export function selectResults(state: CombinedState): Results {
  return state.search;
}
