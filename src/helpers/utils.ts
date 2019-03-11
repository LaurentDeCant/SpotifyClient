import { Artist } from "../types";

export function joinArtistNames(artists: Artist[]) {
  return artists.map(artist => artist.name).join(", ");
}
