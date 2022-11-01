import { useEffect, useRef, useState } from "react";
import { useBreedSuggestions } from "../../hooks";
import { SearchIcon } from "../Icons";
import "./SearchBar.css";

interface SearchBarProps {
  focusOnMount: boolean;
}

export default function SearchBar({ focusOnMount }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, getSuggestions] = useBreedSuggestions();

  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1000 && focusOnMount) {
      field.current?.focus();
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    getSuggestions(event.target.value);
  }

  const thereAreSuggestions = Boolean(suggestions?.info?.length);

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={event => event.preventDefault()}>
        <input
          ref={field}
          className="search-bar__field"
          type="text"
          placeholder="Enter your breed"
          value={query}
          onChange={changeHandler}
        />
        <button className="search-bar__search-button" type="submit">
          <SearchIcon />
        </button>
      </form>
      {thereAreSuggestions && (
        <ul className="search-bar__suggestions">
          {suggestions?.info?.map(({ id, name }) => (
            <li className="search-bar__suggestion" key={id}>
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
