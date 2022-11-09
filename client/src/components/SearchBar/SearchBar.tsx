import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBreedSuggestions } from "../../hooks";
import { SearchIcon } from "../Icons";
import "./SearchBar.css";

interface SearchBarProps {
  focusOnMount: boolean;
}

export default function SearchBar({ focusOnMount }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, getSuggestions] = useBreedSuggestions();
  const [showSuggestions, setShowSuggestions] = useState(true);

  const navigate = useNavigate();

  const [suggestionSelected, setSuggestionSelected] = useState(false);

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
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    navigate(`/breed?name=${query.trim()}`);
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
          onBlur={event => {
            if (!suggestionSelected) {
              return setShowSuggestions(false);
            }

            setSuggestionSelected(false);
            event.target.focus();
          }}
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
          {suggestions?.info?.map(({ id, name }) => (
            <li
              className="search-bar__suggestion"
              onMouseDown={() => {
                changeQuery(name);
                setSuggestionSelected(true);
              }}
              key={id}
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
