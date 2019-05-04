import { Artist } from "../types";

export function joinArtistNames(artists: Artist[]): string {
  return artists.map(artist => artist.name).join(", ");
}
