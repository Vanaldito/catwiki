import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home-page">
      <nav>
        <a href="/" aria-label="Catwiki logo">
          <img
            width="128"
            height="43"
            src="/CatwikiLogo.svg"
            alt="Catwiki logo"
            className="logo-img"
          />
        </a>
      </nav>
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
      </header>
    </main>
  );
}
