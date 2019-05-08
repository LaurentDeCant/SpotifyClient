import { Album, ExternalUrl, Followers, Image } from ".";

export interface Artist {
  external_url: ExternalUrl;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
  albumIds: string[];
  albums: Album[];
  relatedArtistIds: string[];
  topTrackIds: string[];
}
