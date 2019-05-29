import { ImageShape } from "../core/Image";

export interface Cover {
  id: string;
  imageSource?: string;
  imageShape?: ImageShape;
  title: string;
  subTitle?: string;
}
