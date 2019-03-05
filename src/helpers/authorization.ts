import { Dispatch } from "react";
import { receiveAuthorization } from "../actions/authorization";

const URL = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_CLIENT_ID
}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const REGEX = /#access_token=(.*?)&token_type=(.*?)&expires_in=(.*)$/;
const ACCESS_TOKEN = "token";
const TOKEN_TYPE = "tokenType";
const EXPIRES_AT = "expiresAt";

function authorize(): Promise<any> {
  const promise = new Promise((resolve, reject) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN) {
        window.removeEventListener("storage", handleStorage);
        resolve();
      }
    };
    window.addEventListener("storage", handleStorage);
    window.open(URL, undefined, "width=640,height=720");
  });
  return promise;
}

function checkRedirection(): void {
  const match = window.location.hash.match(REGEX);
  if (match) {
    localStorage[ACCESS_TOKEN] = match[1];
    localStorage[TOKEN_TYPE] = match[2];
    const date = new Date();
    date.setSeconds(date.getSeconds() + parseInt(match[3]));
    localStorage[EXPIRES_AT] = date.toString();
    window.close();
  }
}

function initAuthorization(dispatch: Dispatch<any>): void {
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
