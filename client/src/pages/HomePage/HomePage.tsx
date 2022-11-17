import { Footer, Header, Navbar } from "../../components";

import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-page">
      <Navbar />
      <main>
        <Header />
        <section className="have-a-cat">
          <div>
            <h2 className="have-a-cat__title">Why should you have a cat?</h2>
            <p className="have-a-cat__reasons">
              Having a cat around you can actually trigger the release of
              calming chemicals in your body which lower your stress and anxiety
              levels
            </p>
            <a
              className="have-a-cat__read-more"
              href="https://animalkind.org/blog/top-5-reasons-cat/"
              target="_blank"
              rel="noreferrer"
            >
              READ MORE
            </a>
          </div>
          <div className="have-a-cat__images">
            {[2, 3, 1].map(number => (
              <img
                src={`/image ${number}.png`}
                alt="Have a cat"
                key={number}
                className="have-a-cat__image"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
