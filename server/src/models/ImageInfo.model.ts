export interface ImageInfo {
  id: string;
  url: string;
  width: number;
  height: number;
  categories: ImageCategory[];
}

interface ImageCategory {
  id: number;
  name: string;
}
