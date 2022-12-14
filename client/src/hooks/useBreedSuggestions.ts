import { useState } from "react";
import { APIResponse, BreedInfo } from "../models";
import { searchBreeds } from "../services";
import useFetchAndLoad from "./useFetchAndLoad";

export default function useBreedSuggestions() {
  const { loading, callEndpoint } = useFetchAndLoad();
  const [suggestions, setSuggestions] = useState<APIResponse<
    BreedInfo[]
  > | null>(null);

  function getSuggestions(query: string) {
    if (!query) return setSuggestions(null);

    callEndpoint(searchBreeds(query)).then(data => {
      if (data.status === 200 && data.info) {
        setSuggestions(data);
      }
    });
  }

  return { loading, suggestions, getSuggestions };
}
