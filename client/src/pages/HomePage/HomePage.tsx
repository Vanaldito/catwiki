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
    </main>
  );
}
