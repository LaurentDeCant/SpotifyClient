const URL = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_CLIENT_ID
}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const REGEX = /#access_token=(.*?)&token_type=(.*?)&expires_in=(.*)$/;
const KEY = "token";

function authorize() {
  const promise = new Promise<string>((resolve, reject) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === KEY) {
        window.removeEventListener("storage", handleStorage);
        resolve();
      }
    };
    window.addEventListener("storage", handleStorage);
    window.open(URL, undefined, "width=640,height=720");
  });
  return promise;
}

function checkAuthorize() {
  const match = window.location.hash.match(REGEX);
  if (match) {
    localStorage.setItem(KEY, match[1]);
    window.close();
  }
}

function authorizedFetch(url: string): Promise<Response> {
  const token = localStorage.getItem(KEY);
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export { authorize, checkAuthorize as checkAuthorized, authorizedFetch };
