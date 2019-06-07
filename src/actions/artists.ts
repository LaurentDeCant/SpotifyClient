import { Dispatch } from "react";
import { normalize } from "normalizr";
import { fetchJson } from "../utils/authorization";
import { ArtistActionType as ActionType } from ".";
import { EntitiesAction, FetchDispatch } from "./types";
import { Schemas } from "./schemas";
import { checkFollowedArtist } from "./following";

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
  return (dispatch: Dispatch<any>) => {
    dispatch({
      type: ActionType.FullArtistRequest
    });
    const artistUrl = `${process.env.REACT_APP_BASE_URL}/artists/${artistId}`;
    Promise.all([
      fetchJson(artistUrl).then(async artist => ({
        ...artist,
        isFollowed: await checkFollowedArtist(artist.id)
      })),
      fetchJson(`${artistUrl}/albums?country=us`),
      fetchJson(`${artistUrl}/related-artists?country=us`),
      fetchJson(`${artistUrl}/top-tracks?country=us`)
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
