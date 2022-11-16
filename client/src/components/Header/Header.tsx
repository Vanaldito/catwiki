import { useEffect, useState } from "react";
import { SearchedBreedInfo } from "../../models";
import getMostSearchedBreeds from "../../services/getMostSearchedBreeds.service";
import { DropdownMenu } from "../DropdownMenu";
import { Logo } from "../Logo";
import { SearchBar } from "../SearchBar";

import "./Header.css";

export default function Header() {
  const [mostSearchedBreeds, setMostSearchedBreeds] = useState<
    SearchedBreedInfo[] | null
  >(null);
  const [displaySearchMenu, setDisplaySearchMenu] = useState(false);

  useEffect(() => {
    const { call, controller } = getMostSearchedBreeds();

    call.then(data => {
      if (data.status === 200 && data.info) {
        setMostSearchedBreeds(data.info.slice(0, 4));
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

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
            <div onClick={() => setDisplaySearchMenu(true)}>
              <SearchBar focusOnMount={false} />
            </div>
          </div>
        </div>
        <div className="header__most-searched-breeds">
          <h2 className="header__most-searched-breeds__title">
            Most Searched Breeds
          </h2>
          <p className="header__most-searched-breeds__discover">
            66+ Breeds For you to discover
          </p>
          <div className="header__most-searched-breeds__breeds">
            {mostSearchedBreeds?.map(breed => (
              <div key={breed.breedName}>
                <img
                  className="most-searched-breeds__breed__image"
                  src={`/images/${breed.breedImageId}`}
                />
                <div className="most-searched-breeds__breed__name">
                  {breed.breedName}
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      {displaySearchMenu && (
        <DropdownMenu closeMenu={() => setDisplaySearchMenu(false)}>
          <SearchBar focusOnMount={true} />
        </DropdownMenu>
      )}
    </>
  );
}
