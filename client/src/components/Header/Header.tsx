import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFetchAndLoad } from "../../hooks";
import { SearchedBreedInfo } from "../../models";
import { getMostSearchedBreeds } from "../../services";
import { DropdownMenu } from "../DropdownMenu";
import { Loader } from "../Loader";
import { Logo } from "../Logo";
import { SearchBar } from "../SearchBar";

import "./Header.css";

export default function Header() {
  const [mostSearchedBreeds, setMostSearchedBreeds] = useState<
    SearchedBreedInfo[] | null
  >(null);
  const [displaySearchMenu, setDisplaySearchMenu] = useState(false);

  const { loading, callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    callEndpoint(getMostSearchedBreeds()).then(data => {
      if (data.status === 200 && data.info) {
        setMostSearchedBreeds(data.info.slice(0, 4));
      }
    });
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
          <div className="header__most-searched-breeds__info">
            <p className="header__most-searched-breeds__discover">
              66+ Breeds For you to discover
            </p>
            <Link
              className="header__most-searched-breeds__see-more"
              to="/most-searched-breeds"
            >
              TOP MOST SEARCHED BREEDS
            </Link>
          </div>
          {loading ? (
            <Loader />
          ) : (
            <div className="header__most-searched-breeds__breeds">
              {mostSearchedBreeds?.map(breed => (
                <div key={breed.breedName}>
                  <img
                    className="most-searched-breeds__breed__image"
                    src={`/images/${breed.breedImageId}`}
                    alt="Breed reference image"
                  />
                  <div className="most-searched-breeds__breed__name">
                    {breed.breedName}
                  </div>
                </div>
              ))}
            </div>
          )}
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
