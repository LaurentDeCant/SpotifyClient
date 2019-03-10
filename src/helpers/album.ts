import { Album } from "../types";

export function getArtistNames(album: Album) {
  return album ? album.artists.map(artist => artist.name).join(", ") : "";
}
