import { State } from "../reducers";
import { selectArtists } from "./artists";
import { selectPlaylists } from "./playlists";

export function selectFollowedArtists(state: State) {
  return selectArtists(state)(state.following.userArtistIds);
}

export function selectFollowedPlaylists(state: State) {
  return selectPlaylists(state)(state.following.userPlaylistIds);
}
