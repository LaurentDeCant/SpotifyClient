import { ExternalUrl, Followers, Image, Track, User } from ".";

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrl[];
  followers: Followers[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User;
  public: boolean | null;
  snapshot_id: string;
  trackIds: string[];
  tracks: Track[];
  type: string;
  uri: string;
}
