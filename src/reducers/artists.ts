import merge from "lodash/merge";
import { Artist } from "../types";
import { EntitiesAction } from "../actions/types";
import { State as CombinedState } from ".";
import createReducer from "./createReducer";
import { ActionType as AlbumActionType } from "../actions/albums";
import {
  ActionType as ArtistActionType,
  ArtistAlbumsSuccessAction,
  ArtistRelatedArtistsSuccessAction,
  ArtistTopTracksSuccessAction
} from "../actions/artists";
import { ActionType as PlaylistActionType } from "../actions/playlists";
import { ActionType as BrowseActionType } from "../actions/browse";
import { ActionType as SearchActionType } from "../actions/search";
import { selectAlbums } from "./albums";

export interface State {
  byId: { [id: string]: Artist };
}

const initialState: State = {
  byId: {}
};

function mergeArtists(state: State, action: EntitiesAction<any>): State {
  return merge({}, state, { byId: action.payload.artists });
}

export default createReducer(initialState, {
  [ArtistActionType.ArtistSuccess]: mergeArtists,
  [ArtistActionType.ArtistAlbumsSuccess]: (
    state: State,
    action: ArtistAlbumsSuccessAction
  ) => {
    const { artistId, albums } = action.payload;
    return {
      ...state,
      byId: {
        ...state.byId,
        [artistId]: {
          ...state.byId[artistId],
          albumIds: Object.keys(albums)
        }
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
      byId: {
        ...nexState.byId,
        [artistId]: {
          ...nexState.byId[artistId],
          relatedArtistIds: Object.keys(artists)
        }
      }
    };
  },
  [ArtistActionType.ArtistTopTracksSuccess]: (
    state: State,
    action: ArtistTopTracksSuccessAction
  ) => {
    const { artistId, tracks } = action.payload;
    return {
      ...state,
      byId: {
        ...state.byId,
        [artistId]: {
          ...state.byId[artistId],
          tracks: Object.keys(tracks)
        }
      }
    };
  },
  [AlbumActionType.AlbumSuccess]: mergeArtists,
  [PlaylistActionType.PlaylistSuccess]: mergeArtists,
  [BrowseActionType.NewReleasesSuccess]: mergeArtists,
  [SearchActionType.SearchSuccess]: mergeArtists
});

export function selectArtist(state: CombinedState, artistId: string): Artist {
  return state.artists.byId[artistId];
}

export function selectArtists(
  state: CombinedState,
  artistIds: string[]
): Artist[] {
  return artistIds ? artistIds.map(id => selectArtist(state, id)) : [];
}
