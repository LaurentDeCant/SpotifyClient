import { Endpoint, ExternalUrl, Image, User } from ".";

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
