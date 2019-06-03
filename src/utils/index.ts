import { Artist, Image, Type } from "../types";
import { ImageShape } from "../components/core/Image";

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

export function getImageShape(object: { type: Type }): ImageShape {
  return object.type === Type.Artist ? ImageShape.Round : ImageShape.Square;
}
