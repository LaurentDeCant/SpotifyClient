import { merge } from "lodash";
import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  FollowingActionType,
  LibraryActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { EntitiesAction } from "../actions/types";
import {
  ArtistAlbumsSuccessAction,
  ArtistRelatedArtistsSuccessAction,
  ArtistTopTracksSuccessAction
} from "../actions/artists";
import {
  FollowArtistSuccessAction,
  UnfollowArtistSuccessAction,
  CheckFollowedArtistSuccessAction
} from "../actions/following";
import { ArtistDictionary } from "./types";
import createReducer from "./createReducer";

export interface State extends ArtistDictionary {}

export const initialState: State = {};

function mergeArtists(state: State, { payload }: EntitiesAction) {
  return merge({}, state, payload.artists);
}

function updateArtist(state: State, artistId: string, props: any) {
  return {
    ...state,
    [artistId]: {
      ...state[artistId],
      ...props
    }
  };
}

export default createReducer(initialState, {
  [ArtistActionType.ArtistSuccess]: mergeArtists,
  [ArtistActionType.ArtistAlbumsSuccess]: (
    state: State,
    action: ArtistAlbumsSuccessAction
  ) => {
    const { artistId, albums } = action.payload;
    const nexState = mergeArtists(state, action);
    return {
      ...nexState,
      [artistId]: {
        ...nexState[artistId],
        albums: Object.keys(albums)
      }
    };
  },
  [ArtistActionType.ArtistRelatedArtistsSuccess]: (
    state: State,
    action: ArtistRelatedArtistsSuccessAction
  ) => {
    const { artistId, artists } = action.payload;
    const nexState = mergeArtists(state, action);
    return {
      ...nexState,
      [artistId]: {
        ...nexState[artistId],
        relatedArtists: Object.keys(artists)
      }
    };
  },
  [ArtistActionType.ArtistTopTracksSuccess]: (
    state: State,
    action: ArtistTopTracksSuccessAction
  ) => {
    const { artistId, tracks } = action.payload;
    const nexState = mergeArtists(state, action);
    return {
      ...nexState,
      [artistId]: {
        ...nexState[artistId],
        topTracks: Object.keys(tracks)
      }
    };
  },
  [AlbumActionType.AlbumSuccess]: mergeArtists,
  [PlaylistActionType.PlaylistSuccess]: mergeArtists,
  [BrowseActionType.NewReleasesSuccess]: mergeArtists,
  [SearchActionType.SearchSuccess]: mergeArtists,
  [LibraryActionType.SavedAlbumsSuccess]: mergeArtists,
  [LibraryActionType.SavedTracksSuccess]: mergeArtists,
  [FollowingActionType.FollowedArtistsSuccess]: mergeArtists,
  [FollowingActionType.CheckFollowedArtistSuccess]: (
    state: State,
    { payload }: CheckFollowedArtistSuccessAction
  ) => updateArtist(state, payload.artistId, { isFollowed: payload[0] }),
  [FollowingActionType.FollowArtistSuccess]: (
    state: State,
    { payload }: FollowArtistSuccessAction
  ) => updateArtist(state, payload.artistId, { isFollowed: true }),
  [FollowingActionType.UnfollowArtistSuccess]: (
    state: State,
    { payload }: UnfollowArtistSuccessAction
  ) => updateArtist(state, payload.artistId, { isFollowed: false })
});
