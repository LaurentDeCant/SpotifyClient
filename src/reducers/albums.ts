import merge from "lodash/merge";
import { createSelector } from "reselect";
import memoize from "lodash/memoize";
import {
  NormalizedAlbum,
  DenormalizedAlbum,
  DenormalizedTrack
} from "../types";
import { EntitiesAction } from "../actions/types";
import {
  AlbumActionType,
  ArtistActionType,
  BrowseActionType,
  PlaylistActionType,
  SearchActionType
} from "../actions";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { selectArtists } from "./artists";

export interface State {
  [id: string]: NormalizedAlbum;
}

const initialState: State = {};

function mergeAlbums(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, action.payload.albums);
}

export default createReducer(initialState, {
  [AlbumActionType.AlbumSuccess]: mergeAlbums,
  [ArtistActionType.FullArtistSuccess]: mergeAlbums,
  [PlaylistActionType.PlaylistSuccess]: mergeAlbums,
  [ArtistActionType.ArtistAlbumsSuccess]: mergeAlbums,
  [BrowseActionType.NewReleasesSuccess]: mergeAlbums,
  [SearchActionType.SearchSuccess]: mergeAlbums
});

export function selectIsAlbum(
  { albums }: CombinedState,
  albumId: string
): boolean {
  return !!albums[albumId];
}

export function selectAlbum(
  { albums }: CombinedState,
  albumId: string
): DenormalizedAlbum {
  //@ts-ignore
  return albums[albumId];
}

export function selectAlbumArtists(state: CombinedState, albumId: string) {
  const album = selectAlbum(state, albumId);
  if (album) {
    //@ts-ignore
    const artists = selectArtists(state)(album.artists);
    if (artists) {
      return artists;
    }
  }

  return [];
}

export function selectAlbumTracks(state: CombinedState, albumId: string) {
  const album = selectAlbum(state, albumId);
  if (album) {
    //@ts-ignore
    const tracks = selectTracks(state)(album.tracks);
    if (tracks) {
      return tracks;
    }
  }

  return [];
}

export const selectAlbums = createSelector(
  //@ts-ignore
  (state: CombinedState) => state.albums,
  (albums: {
    [albumId: string]: DenormalizedAlbum;
  }): ((albumIds: string[]) => DenormalizedAlbum[]) =>
    memoize((albumIds: string[]) => {
      console.log("selectAlbums");
      return albumIds ? albumIds.map(albumId => albums[albumId]) : [];
    })
);

export function selectPlayableTracks(
  state: CombinedState,
  albumId: string
): DenormalizedTrack[] {
  const tracks = selectAlbumTracks(state, albumId);
  if (tracks) {
    //@ts-ignore
    return tracks.filter(track => track.preview_url);
  }

  return [];
}

export function selectIsPlayable(
  state: CombinedState,
  albumId: string
): boolean {
  return !!selectPlayableTracks(state, albumId).length;
}
