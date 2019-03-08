import { ExternalUrl, Followers, Image } from ".";

export interface PublicUser {
  display_name: string;
  external_urls: ExternalUrl;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}
