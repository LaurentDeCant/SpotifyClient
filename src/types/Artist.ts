import { ExternalUrl } from ".";

export interface Artist {
  external_url: ExternalUrl;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
