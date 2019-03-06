interface Image {
  height: number;
  url: string;
  width: number;
}

export interface Category {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface Artist {
  external_url: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface ExternalUrl {}

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
  restrictions: { reason: string; market: string }[];
  type: string;
  uri: string;
}

export default interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}
