import { createSelector } from "reselect";
import { memoize } from "lodash";
import { Artist } from "../types";
import { State } from "../reducers";
import { ArtistDictionary } from "../reducers/types";
import { selectAlbums } from "./albums";
import { selectTracks } from "./tracks";

export function selectArtist({ artists }: State, artistId: string) {
  return artists[artistId];
}

export function selectArtistAlbums(state: State, artistId: string) {
  const artist = selectArtist(state, artistId);
  if (artist) {
    const albums = selectAlbums(state)(artist.albums);
    if (albums) {
      return albums;
    }
  }

  return [];
}

export function selectArtistRelatedArtists(state: State, artistId: string) {
  const artist = selectArtist(state, artistId);
  if (artist) {
    const artists = selectArtists(state)(artist.relatedArtists);
    if (artists) {
      return artists;
    }
  }

  return [];
}

export function selectArtistTopTracks(state: State, artistId: string) {
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
  (state: State) => state.artists,
  (artists: ArtistDictionary): ((artistIds: string[]) => Artist[]) =>
    memoize((artistIds: string[]) =>
      artistIds ? artistIds.map(artistId => artists[artistId]) : []
    )
);

export function selectPlayableTracks(state: State, artistId: string) {
  const tracks = selectArtistTopTracks(state, artistId);
  return tracks ? tracks.filter(track => track && track.preview_url) : [];
}

export function selectIsPlayable(state: State, artistId: string) {
  return !!selectPlayableTracks(state, artistId).length;
}
