import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import {
  NormalizedArtist,
  DenormalizedArtist,
  DenormalizedTrack,
  DenormalizedAlbum
} from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import {
  ArtistAlbumsSuccessAction,
  ArtistRelatedArtistsSuccessAction,
  ArtistTopTracksSuccessAction
} from "../actions/artists";
import { selectAlbums } from "./albums";
import { selectTracks } from "./tracks";

export interface State {
  [id: string]: NormalizedArtist;
}

const initialState: State = {};

function mergeArtists(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.artists);
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
  [SearchActionType.SearchSuccess]: mergeArtists
});

export function selectIsArtist(
  { artists }: CombinedState,
  artistId: string
): boolean {
  return !!artists[artistId];
}

export function selectArtist(
  { artists }: CombinedState,
  artistId: string
): DenormalizedArtist {
  //@ts-ignore
  return artists[artistId];
}

export function selectArtistAlbums(
  state: CombinedState,
  artistId: string
): DenormalizedAlbum[] {
  const artist = selectArtist(state, artistId);
  if (artist) {
    //@ts-ignore
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
): DenormalizedArtist[] {
  const artist = selectArtist(state, artistId);
  if (artist) {
    //@ts-ignore
    const artists = selectArtists(state)(artist.relatedArtists);
    if (artists) {
      return artists;
    }
  }

  return [];
}

export function selectArtistTopTracks(
  state: CombinedState,
  artistId: string
): DenormalizedTrack[] {
  const artist = selectArtist(state, artistId);
  if (artist) {
    //@ts-ignore
    const tracks = selectTracks(state)(artist.topTracks);
    if (tracks) {
      return tracks;
    }
  }

  return [];
}

export const selectArtists = createSelector(
  //@ts-ignore
  (state: CombinedState) => state.artists,
  (artists: {
    [artistId: string]: DenormalizedArtist;
  }): ((artistIds: string[]) => DenormalizedArtist[]) => {
    console.log("selectArtists");
    return memoize((artistIds: string[]) =>
      artistIds ? artistIds.map(artistId => artists[artistId]) : []
    );
  }
);

export function selectPlayableTracks(
  state: CombinedState,
  artistId: string
): DenormalizedTrack[] {
  const tracks = selectArtistTopTracks(state, artistId);
  if (tracks) {
    return tracks.filter(track => track.preview_url);
  }

  return [];
}

export function selectIsPlayable(
  state: CombinedState,
  artistId: string
): boolean {
  return !!selectPlayableTracks(state, artistId).length;
}
