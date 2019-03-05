import { Dispatch } from "react";
import { receiveAuthorization } from "../actions/authorization";

const URL = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_CLIENT_ID
}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const REGEX = /#access_token=(.*?)&token_type=(.*?)&expires_in=(.*)$/;
const ACCESS_TOKEN = "token";
const TOKEN_TYPE = "tokenType";
const EXPIRES_IN = "expiresIn";

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
    console.log(match);
    localStorage.setItem(ACCESS_TOKEN, match[1]);
    localStorage.setItem(TOKEN_TYPE, match[2]);
    localStorage.setItem(EXPIRES_IN, match[3]);
    window.close();
  }
}

function initAuthorization(dispatch: Dispatch<any>): void {
  if (!!localStorage.getItem(ACCESS_TOKEN)) {
    dispatch(receiveAuthorization());
  }
}

function authorizedFetch(url: string): Promise<Response> {
  const tokenType = localStorage.getItem(TOKEN_TYPE);
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  return fetch(url, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  });
}

export { authorize, checkRedirection, initAuthorization, authorizedFetch };
