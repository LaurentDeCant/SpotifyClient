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

export interface Restriction {
  reason: string;
  market: string;
}

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

export interface Endpoint {
  href: string | null;
  total: number;
}

export interface User {
  display_name: string;
  external_urls: ExternalUrl[];
  followers: Endpoint;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export interface Playlist {
  collaborative: boolean;
  external_urls: ExternalUrl[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User[];
  public: boolean | null;
  snapshot_id: string;
  tracks: Endpoint;
  type: string;
  uri: string;
}
