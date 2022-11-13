import { BreedsResponse, FetchCall } from "../models";

export default function searchBreeds(query: string): FetchCall<BreedsResponse> {
  const controller = new AbortController();

  return {
    call: fetch(`/api/v1/search/breeds?q=${query}`, {
      method: "GET",
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
