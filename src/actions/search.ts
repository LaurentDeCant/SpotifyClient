import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
  SearchRequest = "SEARCH_REQUEST",
  SearchSuccess = "SEARCH_SUCCESS",
  SearchFailure = "SEARCH+FAILURE"
}

export interface SearchSuccessAction
  extends EntitiesAction<ActionType.SearchSuccess> {}

export function search(query: string) {
  return (dispatch: FetchDispatch) => {
    const encoded = encodeURIComponent(query);
    dispatch({
      types: [
        ActionType.SearchRequest,
        ActionType.SearchSuccess,
        ActionType.SearchFailure
      ],
      path: `search?q=${encoded}&type=artist,album,track`,
      schema: Schemas.Results
    });
  };
}
