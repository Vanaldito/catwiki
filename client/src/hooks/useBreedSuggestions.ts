import { useState } from "react";
import { BreedsResponse } from "../models";
import { searchBreeds } from "../services";

export default function useBreedSuggestions(): [
  BreedsResponse | null,
  (query: string) => void
] {
  const [currentTimeout, setCurrentTimeout] = useState<NodeJS.Timeout | null>(
    null
  );
  const [currentController, setCurrentController] =
    useState<AbortController | null>(null);
  const [suggestions, setSuggestions] = useState<BreedsResponse | null>(null);

  function getSuggestions(query: string) {
    // Abort the previous request because the user is typing.
    currentController?.abort();
    if (currentTimeout) clearTimeout(currentTimeout);

    if (!query) return setSuggestions(null);

    setCurrentTimeout(
      // Call the api after 400ms to make sure the user stopped typing.
      setTimeout(() => {
        const { controller, call } = searchBreeds(query);

        setCurrentController(controller);

        call.then(data => {
          if (data.status === 200 && data.info) {
            setSuggestions(data);
            setCurrentController(null);
          }
        });
      }, 400)
    );
  }

  return [suggestions, getSuggestions];
}
