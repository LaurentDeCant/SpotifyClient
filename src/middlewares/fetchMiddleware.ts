import { Dispatch } from "redux";
import { normalize } from "normalizr";
import { authorizedFetch } from "../utils/authorization";

export default () => (next: Dispatch) => (action: any) => {
  const { types, path, schema, data } = action;

  if (types) {
    const [requestType, successType, failureType] = types;
    next({ type: requestType });

    return authorizedFetch(`${process.env.REACT_APP_BASE_URL}/${path}`).then(
      response =>
        response.json().then(json => {
          if (response.ok) {
            const payload = schema ? normalize(json, schema).entities : json;
            next({
              type: successType,
              payload: data ? { ...payload, ...data } : payload
            });
          } else {
            next({ type: failureType, payload: json.error });
          }
        })
    );
  } else {
    next(action);
  }
};
