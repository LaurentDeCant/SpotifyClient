import { PublicUser, NormalizedTrack as Track } from ".";

export interface PlaylistTrack {
  added_at: Date;
  added_by: PublicUser;
  is_local: boolean;
  track: Track;
}
