import { Endpoint, ExternalUrl, Image } from ".";

export interface User {
  display_name: string;
  external_urls: ExternalUrl[];
  followers?: Endpoint;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}
