import {
  Artist,
  Copyright,
  ExternalId,
  ExternalUrl,
  Image,
  Paging,
  Restriction,
  Track
} from ".";

export interface Album {
  album_type: string;
  artists: Artist[];
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
  tracks: Paging<Track>;
  type: string;
  uri: string;
}
