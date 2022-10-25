import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header__hero-image">
        <div className="header__hero-text">
          <h1 className="header__hero-text__title">CatWiki</h1>
          <p className="header__hero-text__description">
            Get to know more about your cat breed
          </p>
          <button className="header__search-button" type="button">
            Search
          </button>
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
  );
}
