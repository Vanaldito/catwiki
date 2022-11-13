import { BreedInfo, APIResponse, FetchCall } from "../models";

export default function searchBreeds(
  query: string
): FetchCall<APIResponse<BreedInfo[]>> {
  const controller = new AbortController();

  return {
    call: fetch(`/api/v1/search/breeds?q=${query}`, {
      method: "GET",
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
