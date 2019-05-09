import {
  DenormalizedArtist,
  Copyright,
  ExternalId,
  ExternalUrl,
  Image,
  Restriction,
  DenormalizedTrack
} from ".";

interface Album {
  album_type: string;
  available_markets: string[];
  coyrights: Copyright[];
  external_ids: ExternalId[];
  external_urls: ExternalUrl[];
  genre: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: string;
  restrictions: Restriction[];
  type: string;
  uri: string;
}

export interface NormalizedAlbum extends Album {
  artists: string[];
  tracks: string[];
}

export interface DenormalizedAlbum extends Album {
  artists: DenormalizedArtist[];
  tracks: DenormalizedTrack[];
}
