import { DenormalizedArtist as Artist, Image } from "../types";

export function getArtistNames(artists: Artist[]): string {
  return artists.map(artist => artist.name).join(", ");
}

export function getImageUrl(object: { images: Image[] }): string | undefined {
  return object && object.images && object.images.length
    ? object.images[0].url
    : undefined;
}
