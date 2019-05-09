import {
  DenormalizedArtist as Artist,
  DenormalizedTrack as Track
} from "../types";

export function joinArtistNames(artists: Artist[]): string {
  return artists.map(artist => artist.name).join(", ");
}

export function hasPlayableTrack(tracks: Track[]): boolean {
  return tracks.some(track => !!track.preview_url);
}
