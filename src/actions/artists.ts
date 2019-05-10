import { Dispatch } from "react";
import { normalize } from "normalizr";
import { fetchJson } from "../utils/authorization";
import { EntitiesAction, FetchDispatch, PayloadAction } from "./types";
import { Schemas } from "./schemas";

export enum ActionType {
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
  ArtistTopTracksFailure = "ARTIST_TOP_TRACKS_FAILURE",
  FullArtistRequest = "FULL_ARTIST_REQUEST",
  FullArtistSuccess = "FULL_ARTIST_SUCCESS",
  FullArtistFailure = "FULL_ARTIST_FAILURE"
}

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
      schema: Schemas.Artist
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
      schema: Schemas.Albums,
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
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: ActionType.FullArtistRequest
    });
    const url = `${process.env.REACT_APP_BASE_URL}/artists/${artistId}`;
    Promise.all([
      fetchJson(url),
      fetchJson(`${url}/albums`),
      fetchJson(`${url}/related-artists`),
      fetchJson(`${url}/top-tracks?country=us`)
    ]).then(([artist, albums, relatedArtists, topTracks]) => {
      dispatch({
        type: ActionType.FullArtistSuccess,
        payload: normalize(
          {
            ...artist,
            albums: albums.items,
            relatedArtists: relatedArtists.artists,
            topTracks: topTracks.tracks
          },
          Schemas.Artist
        ).entities
      });
    });
  };
}
