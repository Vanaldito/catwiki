import { APIResponse, BreedInfo, FetchCall } from "../models";

export default function getBreedInfo(
  breedName: string
): FetchCall<APIResponse<BreedInfo>> {
  const controller = new AbortController();

  return {
    call: fetch(`/api/v1/breed?name=${breedName}`, {
      method: "GET",
      signal: controller.signal,
    }).then(res => res.json()),
    controller,
  };
}
