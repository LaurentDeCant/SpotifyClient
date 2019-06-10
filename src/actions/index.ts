export enum AlbumActionType {
  AlbumRequest = "ALBUM_REQUEST",
  AlbumSuccess = "ALBUM_SUCCESS",
  AlbumFailure = "ALBUM_FAILURE"
}

export enum ArtistActionType {
  ArtistRequest = "ARTIST_REQUEST",
  ArtistSuccess = "ARTIST_SUCCESS",
  ArtistFailure = "ARTIST_FAILURE",
  ArtistAlbumsRequest = "ARTIST_ALBUMS_REQUEST",
  ArtistAlbumsSuccess = "ARTIST_ALBUMS_SUCCESS",
  ArtistAlbumsFailure = "ARTIST_ALBUMS_FAILURE",
  ArtistRelatedArtistsRequest = "ARTIST_RELATED_ARTISTS_REQUEST",
  ArtistRelatedArtistsSuccess = "ARTIST_RELATED_ARTISTS_SUCCESS",
  ArtistRelatedArtistsFailure = "ARTIST_RELATED_ARTISTS_FAILURE",
  ArtistTopTracksRequest = "ARTIST_TOP_TRACKS_REQUEST",
  ArtistTopTracksSuccess = "ARTIST_TOP_TRACKS_SUCCESS",
  ArtistTopTracksFailure = "ARTIST_TOP_TRACKS_FAILURE"
}

export enum BrowseActionType {
  CategoriesRequest = "CATEGORIES_REQUEST",
  CategoriesSuccess = "CATEGORIES_SUCCESS",
  CategoriesFailure = "CATEGORIES_FAILURE",
  CategoryRequest = "CATEGORY_REQUEST",
  CategorySuccess = "CATEGORY_SUCCESS",
  CategoryFailure = "CATEGORY_FAILURE",
  CategoryPlaylistsRequest = "CATEGORY_PLAYLISTS_REQUEST",
  CategoryPlaylistsSuccess = "CATEGORY_PLAYLISTS_SUCCESS",
  CategoryPlaylistsFailure = "CATEGORY_PLAYLISTS_FAILURE",
  FeaturedPlaylistsRequest = "FEATURED_PLAYLISTS_REQUEST",
  FeaturedPlaylistsSuccess = "FEATURED_PLAYLISTS_SUCCESS",
  FeaturedPlaylistsFailure = "FEATURED_PLAYLISTS_FAILURE",
  NewReleasesRequest = "NEW_RELEASES_REQUEST",
  NewReleasesSuccess = "NEW_RELEASES_SUCCESS",
  NewReleasesFailure = "NEW_RELEASES_FAILURE"
}

export enum FollowingActionType {
  FollowedArtistsRequest = "FOLLOWED_ARTISTS_REQUEST",
  FollowedArtistsSuccess = "FOLLOWED_ARTISTS_SUCCESS",
  FollowedArtistsFailure = "FOLLOWED_ARTISTS_FAILURE",
  CheckFollowedArtistRequest = "CHECK_FOLLOWED_ARTIST_REQUEST",
  CheckFollowedArtistSuccess = "CHECK_FOLLOWED_ARTIST_SUCCESS",
  CheckFollowedArtistFailure = "CHECK_FOLLOWED_ARTIST_FAILURE",
  FollowArtistRequest = "FOLLOW_ARTIST_REQUEST",
  FollowArtistSuccess = "FOLLOW_ARTIST_SUCCESS",
  FollowArtistFailure = "FOLLOW_ARTIST_FAILURE",
  UnfollowArtistRequest = "UNFOLLOW_ARTIST_REQUEST",
  UnfollowArtistSuccess = "UNFOLLOW_ARTIST_SUCCESS",
  UnfollowArtistFailure = "UNFOLLOW_ARTIST_FAILURE",
  FollowedPlaylistsRequest = "FOLLOWED_PLAYLISTS_REQUEST",
  FollowedPlaylistsSuccess = "FOLLOWED_PLAYLISTS_SUCCESS",
  FollowedPlaylistsFailure = "FOLLOWED_PLAYLISTS_FAILURE",
  CheckFollowedPlaylistRequest = "CHECK_FOLLOWED_PLAYLIST_REQUEST",
  CheckFollowedPlaylistSuccess = "CHECK_FOLLOWED_PLAYLIST_SUCCESS",
  CheckFollowedPlaylistFailure = "CHECK_FOLLOWED_PLAYLIST_FAILURE",
  FollowPlaylistRequest = "FOLLOW_PLAYLIST_REQUEST",
  FollowPlaylistSuccess = "FOLLOW_PLAYLIST_SUCCESS",
  FollowPlaylistFailure = "FOLLOW_PLAYLIST_FAILURE",
  UnfollowPlaylistRequest = "UNFOLLOW_PLAYLIST_REQUEST",
  UnfollowPlaylistSuccess = "UNFOLLOW_PLAYLIST_SUCCESS",
  UnfollowPlaylistFailure = "UNFOLLOW_PLAYLIST_FAILURE"
}

export enum LibraryActionType {
  SavedAlbumsRequest = "SAVED_ALBUMS_REQUEST",
  SavedAlbumsSuccess = "SAVED_ALBUMS_SUCCESS",
  SavedAlbumsFailure = "SAVED_ALBUMS_FAILURE",
  CheckSavedAlbumRequest = "CHECK_SAVED_ALBUM_REQUEST",
  CheckSavedAlbumSuccess = "CHECK_SAVED_ALBUM_SUCCESS",
  CheckSavedAlbumFailure = "CHECK_SAVED_ALBUM_FAILURE",
  SaveAlbumRequest = "SAVE_ALBUM_REQUEST",
  SaveAlbumSuccess = "SAVE_ALBUM_SUCCESS",
  SaveAlbumFailure = "SAVE_ALBUM_FAILURE",
  UnsaveAlbumRequest = "UNSAVE_ALBUM_REQUEST",
  UnsaveAlbumSuccess = "UNSAVE_ALBUM_SUCCESS",
  UnsaveAlbumFailure = "UNSAVE_ALBUM_FAILURE",
  SavedTracksRequest = "SAVED_TRACKS_REQUEST",
  SavedTracksSuccess = "SAVED_TRACKS_SUCCESS",
  SavedTracksFailure = "SAVED_TRACKS_FAILURE",
  CheckSavedTracksRequest = "CHECK_SAVED_TRACKS_REQUEST",
  CheckSavedTracksSuccess = "CHECK_SAVED_TRACKS_SUCCESS",
  CheckSavedTracksFailure = "CHECK_SAVED_TRACKS_FAILURE",
  SaveTrackRequest = "SAVE_TRACK_REQUEST",
  SaveTrackSuccess = "SAVE_TRACK_SUCCESS",
  SaveTrackFailure = "SAVE_TRACK_FAILURE",
  UnsaveTrackRequest = "UNSAVE_TRACK_REQUEST",
  UnsaveTrackSuccess = "UNSAVE_TRACK_SUCCESS",
  UnsaveTrackFailure = "UNSAVE_TRACK_FAILURE"
}

export enum PlaylistActionType {
  PlaylistRequest = "PLAYLIST_REQUEST",
  PlaylistSuccess = "PLAYLIST_SUCCESS",
  PlaylistFailure = "PLAYLIST_FAILURE"
}

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

export enum UserProfileActionType {
  UserProfileRequest = "USER_PROFILE_REQUEST",
  UserProfileSuccess = "USER_PROFILE_SUCCESS",
  UserProfileFailure = "USER_PROFILE_FAILURE"
}
