import { ExternalUrl, Followers, Image, Type } from ".";

export interface Artist {
  external_url: ExternalUrl;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: Type;
  uri: string;
  albums: string[];
  relatedArtists: string[];
  topTracks: string[];
  isFollowed: boolean;
}
