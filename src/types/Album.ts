import { Artist, ExternalUrl, Image, Restriction } from ".";

export interface Album {
  album_group?: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrl[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: Restriction[];
  type: string;
  uri: string;
}
