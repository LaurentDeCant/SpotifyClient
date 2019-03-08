import { Dispatch } from "redux";
import { authorizedFetch } from "../helpers/authorization";

export default () => (next: Dispatch) => (action: any) => {
  const { types, path, select: select } = action;
  if (types) {
    const [requestType, successType, failureType] = types;
    next({ type: requestType });

    return authorizedFetch(`${process.env.REACT_APP_BASE_URL}/${path}`).then(
      response =>
        response.json().then(json => {
          if (response.ok) {
            next({ type: successType, payload: select(json) });
          } else {
            next({ type: failureType, payload: json.error });
          }
        })
    );
  } else {
    next(action);
  }
};
