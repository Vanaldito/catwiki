import { BreedInfo } from "../models";

export default function searchBreedsByName(
  query: string
): Promise<BreedInfo[]> {
  return fetch(`https://api.thecatapi.com/v1/breeds/search?q=${query}`, {
    method: "GET",
    headers: {
      "x-api-key": process.env.API_KEY as string,
    },
  }).then(res => res.json());
}
