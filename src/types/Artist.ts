import {
  DenormalizedAlbum,
  ExternalUrl,
  Followers,
  Image,
  DenormalizedTrack
} from ".";

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
}

export interface NormalizedArtist extends Artist {
  albums: string[];
  relatedArtists: string[];
  topTracks: string[];
}

export interface DenormalizedArtist extends Artist {
  albums: DenormalizedAlbum[];
  relatedArtists: DenormalizedArtist[];
  topTracks: DenormalizedTrack[];
}
