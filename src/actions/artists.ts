import { ArtistActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";

export interface ArtistSuccessAction
  extends EntitiesAction<ActionType.ArtistSuccess> {}

export function getArtist(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.ArtistRequest,
        ActionType.ArtistSuccess,
        ActionType.ArtistFailure
      ],
      path: `artists/${artistId}`,
      schema: Schemas.Artist,
      then: () => {}
    });
  };
}

export interface ArtistAlbumsSuccessAction
  extends EntitiesAction<
    ActionType.ArtistAlbumsSuccess,
    { artistId: string }
  > {}

export function getArtistAlbums(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.ArtistAlbumsRequest,
        ActionType.ArtistAlbumsSuccess,
        ActionType.ArtistAlbumsFailure
      ],
      path: `artists/${artistId}/albums`,
      schema: Schemas.PagedAlbums,
      data: { artistId }
    });
  };
}

export interface ArtistRelatedArtistsSuccessAction
  extends EntitiesAction<
    ActionType.ArtistRelatedArtistsSuccess,
    { artistId: string }
  > {}

export function getArtistRelatedArtists(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.ArtistRelatedArtistsRequest,
        ActionType.ArtistRelatedArtistsSuccess,
        ActionType.ArtistRelatedArtistsFailure
      ],
      path: `artists/${artistId}/related-artists`,
      schema: Schemas.Artists,
      data: { artistId }
    });
  };
}

export interface ArtistTopTracksSuccessAction
  extends EntitiesAction<
    ActionType.ArtistTopTracksSuccess,
    { artistId: string }
  > {}

export function getArtistTopTracks(artistId: string) {
  return (dispatch: FetchDispatch) => {
    dispatch({
      types: [
        ActionType.ArtistTopTracksRequest,
        ActionType.ArtistTopTracksSuccess,
        ActionType.ArtistTopTracksFailure
      ],
      path: `artists/${artistId}/top-tracks?country=us`,
      schema: Schemas.Tracks,
      data: { artistId }
    });
  };
}

export function getFullArtist(artistId: string) {
  return (dispatch: FetchDispatch) => {
    getArtist(artistId)(dispatch);
    getArtistAlbums(artistId)(dispatch);
    getArtistRelatedArtists(artistId)(dispatch);
    getArtistTopTracks(artistId)(dispatch);
  };
}
