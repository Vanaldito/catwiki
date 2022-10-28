import { useEffect, useRef } from "react";
import { SearchIcon } from "../Icons";
import "./SearchBar.css";

interface SearchBarProps {
  closeBar: () => void;
}

export default function SearchBar({ closeBar }: SearchBarProps) {
  const field = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      field.current?.focus();
    }
  });

  return (
    <div className="search-bar">
      <button onClick={closeBar} className="search-bar__close-button">
        Close
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
        />
        <button className="search-bar__search-button" type="submit">
          <SearchIcon />
        </button>
        <div className="search-bar__recommendations"></div>
      </form>
    </div>
  );
}