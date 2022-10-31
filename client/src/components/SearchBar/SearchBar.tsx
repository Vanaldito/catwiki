import { useEffect, useRef, useState } from "react";
import { useBreedSuggestions } from "../../hooks";
import { CloseIcon, SearchIcon } from "../Icons";
import "./SearchBar.css";

interface SearchBarProps {
  closeBar: () => void;
}

export default function SearchBar({ closeBar }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [suggestions, getSuggestions] = useBreedSuggestions();

  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      field.current?.focus();
    }
  }, []);

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.target.value);
    getSuggestions(event.target.value);
  }

  const thereAreSuggestions = Boolean(suggestions?.info?.length);

  return (
    <div className="search-bar">
      <button onClick={closeBar} className="search-bar__close-button">
        <CloseIcon />
      </button>
      <form
        className="search-bar__form"
        onSubmit={event => event.preventDefault()}
      >
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
