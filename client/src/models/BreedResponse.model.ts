import { BreedInfo } from "./BreedInfo.model";

export interface BreedsResponse {
  status: number;
  info?: BreedInfo[];
  error?: string;
}
