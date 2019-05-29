export { ActionType as AlbumActionType } from "./albums";
export { ActionType as ArtistActionType } from "./artists";
export { ActionType as BrowseActionType } from "./browse";
export { ActionType as PlaylistActionType } from "./playlists";

export enum SearchActionType {
  SearchRequest = "SEARCH_REQUEST",
  SearchSuccess = "SEARCH_SUCCESS",
  SearchFailure = "SEARCH_FAILURE",
  ClearResults = "CLEAR_RESULTS",
  SelectAlbum = "SELECT_ALBUM",
  SelectArtist = "SELECT_ARTIST",
  SelectPlaylist = "SELECT_PLAYLIST",
  ClearRecents = "CLEAR_RECENTS"
}
