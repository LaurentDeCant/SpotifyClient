import { ExternalUrl, Followers, Image, DenormalizedTrack, User } from ".";

interface Playlist {
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
  type: string;
  uri: string;
}

export interface NormalizedPlaylist extends Playlist {
  tracks: string[];
}

export interface DenormalizedPlaylist extends Playlist {
  tracks: DenormalizedTrack[];
}
