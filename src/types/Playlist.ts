import { ExternalUrl, Followers, Image, Type, User } from ".";

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
  tracks: string[];
  type: Type;
  uri: string;
  isFollowed: boolean;
}
