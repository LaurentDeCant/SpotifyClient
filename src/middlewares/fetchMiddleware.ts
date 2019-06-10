import { Dispatch } from "redux";
import { normalize } from "normalizr";
import { authorizedFetch } from "../utils/authorization";

export default () => (next: Dispatch) => (action: any) => {
  const { types, path, method, schema, data, then } = action;

  if (types) {
    const [requestType, successType, failureType] = types;

    next({ type: requestType });

    return authorizedFetch(
      `${process.env.REACT_APP_BASE_URL}/${path}`,
      method
    ).then(async response => {
      const text = await response.text();
      const json = text ? JSON.parse(text) : null;

      if (response.ok) {
        const payload =
          json && schema ? normalize(json, schema).entities : json;

        next({
          type: successType,
          payload: data ? { ...payload, ...data } : payload
        });
      } else {
        next({ type: failureType, payload: json.error });
      }
      if (then) {
        then(json);
      }
    });
  } else {
    next(action);
  }
};
