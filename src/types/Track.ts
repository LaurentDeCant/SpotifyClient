import { ExternalId, ExternalUrl, Restriction, TrackLink } from ".";

export interface Track {
  album: string;
  artists: string[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids?: ExternalId;
  external_urls?: ExternalUrl;
  href: string;
  id: string;
  is_playable: boolean;
  linked_from?: TrackLink;
  restrictions: Restriction[];
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
  isSaved: boolean;
}
