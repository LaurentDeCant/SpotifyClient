import { Dispatch } from "redux";
import { receiveAuthorization } from "../actions/authorization";

const URL = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_CLIENT_ID
}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const REGEX = /#access_token=(.*?)&token_type=(.*?)&expires_in=(.*)$/;
const ACCESS_TOKEN = "token";
const TOKEN_TYPE = "tokenType";
const EXPIRES_AT = "expiresAt";

function authorize(): Promise<any> {
  return new Promise((resolve, reject) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN) {
        removeEventListener("storage", handleStorage);
        resolve();
      }
    };
    addEventListener("storage", handleStorage);
    location.assign(URL);
  });
}

function checkRedirection(): void {
  const match = location.hash.match(REGEX);
  if (match) {
    localStorage[ACCESS_TOKEN] = match[1];
    localStorage[TOKEN_TYPE] = match[2];
    const date = new Date();
    date.setSeconds(date.getSeconds() + parseInt(match[3]));
    localStorage[EXPIRES_AT] = date.toString();
  }
}

function initAuthorization(dispatch: Dispatch): void {
  if (
    !!localStorage[ACCESS_TOKEN] &&
    Date.parse(localStorage[EXPIRES_AT]) > Date.now()
  ) {
    dispatch(receiveAuthorization());
  }
}

function authorizedFetch(url: string): Promise<Response> {
  const tokenType = localStorage[TOKEN_TYPE];
  const accessToken = localStorage[ACCESS_TOKEN];

  return fetch(url, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  });
}

export { authorize, checkRedirection, initAuthorization, authorizedFetch };
