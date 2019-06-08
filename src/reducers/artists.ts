import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import { Artist } from "../types";
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
import { State as CombinedState } from ".";
import { ArtistDictionary } from "./types";
import createReducer from "./createReducer";
import { selectAlbums } from "./albums";
import { selectTracks } from "./tracks";
import {
  FollowArtistSuccessAction,
  UnfollowArtistSuccessAction
} from "../actions/following";

export interface State extends ArtistDictionary {}

const initialState: State = {};

function mergeArtists(state: State, { payload }: EntitiesAction<any>): State {
  return merge({}, state, payload.artists);
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
  [ArtistActionType.FullArtistSuccess]: mergeArtists,
  [AlbumActionType.AlbumSuccess]: mergeArtists,
  [PlaylistActionType.PlaylistSuccess]: mergeArtists,
  [BrowseActionType.NewReleasesSuccess]: mergeArtists,
  [SearchActionType.SearchSuccess]: mergeArtists,
  [LibraryActionType.SavedAlbumsSuccess]: mergeArtists,
  [LibraryActionType.SavedTracksSuccess]: mergeArtists,
  [FollowingActionType.FollowedArtistsSuccess]: mergeArtists,
  [FollowingActionType.FollowArtistSuccess]: (
    state: State,
    { payload }: FollowArtistSuccessAction
  ) => ({
    ...state,
    [payload.artistId]: {
      ...state[payload.artistId],
      isFollowed: true
    }
  }),
  [FollowingActionType.UnfollowArtistSuccess]: (
    state: State,
    { payload }: UnfollowArtistSuccessAction
  ) => ({
    ...state,
    [payload.artistId]: {
      ...state[payload.artistId],
      isFollowed: false
    }
  })
});

export function selectArtist({ artists }: CombinedState, artistId: string) {
  return artists[artistId];
}

export function selectArtistAlbums(state: CombinedState, artistId: string) {
  const artist = selectArtist(state, artistId);
  if (artist) {
    const albums = selectAlbums(state)(artist.albums);
    if (albums) {
      return albums;
    }
  }

  return [];
}

export function selectArtistRelatedArtists(
  state: CombinedState,
  artistId: string
) {
  const artist = selectArtist(state, artistId);
  if (artist) {
    const artists = selectArtists(state)(artist.relatedArtists);
    if (artists) {
      return artists;
    }
  }

  return [];
}

export function selectArtistTopTracks(state: CombinedState, artistId: string) {
  const artist = selectArtist(state, artistId);
  if (artist) {
    const tracks = selectTracks(state)(artist.topTracks);
    if (tracks) {
      return tracks;
    }
  }

  return [];
}

export const selectArtists = createSelector(
  (state: CombinedState) => state.artists,
  (artists: ArtistDictionary): ((artistIds: string[]) => Artist[]) =>
    memoize((artistIds: string[]) =>
      artistIds ? artistIds.map(artistId => artists[artistId]) : []
    )
);

export function selectPlayableTracks(state: CombinedState, artistId: string) {
  const tracks = selectArtistTopTracks(state, artistId);
  return tracks ? tracks.filter(track => track.preview_url) : [];
}

export function selectIsPlayable(state: CombinedState, artistId: string) {
  return !!selectPlayableTracks(state, artistId).length;
}
