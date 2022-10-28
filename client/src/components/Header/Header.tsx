import { useState } from "react";
import { SearchIcon } from "../Icons";
import { Logo } from "../Logo";
import { SearchBar } from "../SearchBar";

import "./Header.css";

export default function Header() {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header__hero-image">
          <div className="header__hero-text">
            <h1 className="header__hero-text__title">CatWiki</h1>
            <span className="header__hero-text__logo">
              <Logo size="lg" color="white" />
            </span>
            <p className="header__hero-text__description">
              Get to know more about your cat breed
            </p>
            <form
              className="header__search-form"
              onSubmit={event => event.preventDefault()}
            >
              <input
                className="header__search-field"
                placeholder="Enter your breed"
                onClick={() => setDisplaySearchBar(true)}
              />
              <button className="header__search-button" type="submit">
                <SearchIcon />
              </button>
            </form>
          </div>
        </div>
        <div className="header__most-searched-breeds">
          <h2 className="header__most-searched-breeds__title">
            Most Searched Breeds
          </h2>
          <p className="header__most-searched-breeds__discover">
            66+ Breeds For you to discover
          </p>
          <div className="header__most-searched-breeds__breeds"></div>
        </div>
      </header>
      {displaySearchBar && (
        <SearchBar closeBar={() => setDisplaySearchBar(false)} />
      )}
    </>
  );
}
