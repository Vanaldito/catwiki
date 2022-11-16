import { APIResponse, FetchCall, SearchedBreedInfo } from "../models";

export default function getMostSearchedBreeds(): FetchCall<
  APIResponse<SearchedBreedInfo[]>
> {
  const controller = new AbortController();

  return {
    call: fetch("/api/v1/most-searched-breeds", {
      method: "GET",
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
