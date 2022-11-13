import { ImageInfo } from "../models";

export default function getImageById(imageId: string): Promise<ImageInfo> {
  return fetch(`https://api.thecatapi.com/v1/images/${imageId}`).then(res =>
    res.json()
  );
}
