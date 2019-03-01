const url = `https://accounts.spotify.com/authorize?client_id=${
  process.env.REACT_APP_CLIENT_ID
}&response_type=token&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}`;
const regex = /#access_token=(.*?)&token_type=(.*?)&expires_in=(.*)$/;

function authorize() {
  const promise = new Promise((resolve, reject) => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "token") {
        window.removeEventListener("storage", handleStorage);
        resolve();
      }
    };
    window.addEventListener("storage", handleStorage);
    window.open(url, undefined, "width=640,height=720");
  });

  return promise;
}

function checkAuthorized() {
  const match = window.location.hash.match(regex);
  if (match) {
    localStorage.setItem("token", match[1]);
    window.close();
  }
}

export { authorize, checkAuthorized };
