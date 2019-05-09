import { DenormalizedAlbum, ExternalUrl, Followers, Image } from ".";

interface Artist {
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
  relatedArtistIds: string[];
  topTrackIds: string[];
}

export interface NormalizedArtist extends Artist {
  albums: string[];
}

export interface DenormalizedArtist extends Artist {
  albums: DenormalizedAlbum[];
}
