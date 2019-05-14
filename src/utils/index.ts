import { Artist, Image } from "../types";

export function getArtistNames(artists: Artist[]): string {
  return artists.map(artist => artist.name).join(", ");
}

export function getImageSource(object: {
  images: Image[];
}): string | undefined {
  return object && object.images && object.images.length
    ? object.images[0].url
    : undefined;
}
