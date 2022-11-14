import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreedSuggestions } from "../../hooks";
import { BreedInfo } from "../../models";
import { SearchIcon } from "../Icons";
import "./SearchBar.css";
import Suggestion from "./Suggestion";

interface SearchBarProps {
  focusOnMount: boolean;
}

export default function SearchBar({ focusOnMount }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, getSuggestions] = useBreedSuggestions();
  const [showSuggestions, setShowSuggestions] = useState(true);

  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const navigate = useNavigate();

  const field = useRef<HTMLInputElement>(null);
  const searchBarContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (focusOnMount) {
      field.current?.focus();
    }
  }, []);

  function changeQuery(newQuery: string) {
    setQuery(newQuery);
    getSuggestions(newQuery);
    setSelectedSuggestionIndex(-1);
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate(`/breed?name=${query.trim()}`);
  }

  function keyDownHandler(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!thereAreSuggestions) return;

    switch (event.key) {
      case "ArrowUp": {
        event.preventDefault();

        const newSuggestionIndex = selectedSuggestionIndex - 1;

        if (newSuggestionIndex < 0) return;
        setSelectedSuggestionIndex(newSuggestionIndex);

        setQuery((suggestions?.info as BreedInfo[])[newSuggestionIndex].name);
        break;
      }
      case "ArrowDown": {
        event.preventDefault();

        const maxSuggestionIndex = (suggestions?.info?.length as number) - 1;
        const newSuggestionIndex = selectedSuggestionIndex + 1;

        if (newSuggestionIndex > maxSuggestionIndex) return;
        setSelectedSuggestionIndex(newSuggestionIndex);

        setQuery((suggestions?.info as BreedInfo[])[newSuggestionIndex].name);
        break;
      }
    }
  }

  const thereAreSuggestions = Boolean(suggestions?.info?.length);

  return (
    <div ref={searchBarContainer} className="search-bar-container">
      <form className="search-bar" onSubmit={submitHandler}>
        <input
          ref={field}
          className="search-bar__field"
          type="text"
          placeholder="Enter your breed"
          value={query}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => {
            setSelectedSuggestionIndex(-1);
            return setShowSuggestions(false);
          }}
          onKeyDown={keyDownHandler}
          onChange={event => changeQuery(event.target.value)}
        />
        <button
          className="search-bar__search-button"
          type="submit"
          aria-label="Search Breed"
        >
          <SearchIcon />
        </button>
      </form>
      {showSuggestions && thereAreSuggestions && (
        <ul className="search-bar__suggestions">
          {suggestions?.info?.map(({ id, name }, index) => (
            <li key={id}>
              <Suggestion
                isSelected={index === selectedSuggestionIndex}
                onMouseDown={() => {
                  navigate(`/breed?name=${name}`);
                }}
              >
                {name}
              </Suggestion>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
