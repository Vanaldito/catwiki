import { useEffect, useState } from "react";
import { BreedsResponse } from "../models";
import { searchBreeds } from "../services";

export default function useBreedSuggestions(): [
  BreedsResponse | null,
  (query: string) => void
] {
  const [controller, setController] = useState<AbortController | null>(null);
  const [suggestions, setSuggestions] = useState<BreedsResponse | null>(null);

  function getSuggestions(query: string) {
    if (!query) return setSuggestions(null);

    const { controller, call } = searchBreeds(query);

    setController(controller);

    call.then(data => {
      if (data.status === 200 && data.info) {
        setSuggestions(data);
      }
      setController(null);
    });
  }

  useEffect(() => {
    return () => {
      controller?.abort();
    };
  }, []);

  return [suggestions, getSuggestions];
}
