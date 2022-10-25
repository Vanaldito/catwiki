import { Header, Navbar } from "../../components";

import "./HomePage.css";

export default function HomePage() {
  return (
    <main className="home-page">
      <Navbar />
      <Header />
      <section className="have-a-cat">
        <h2 className="have-a-cat__title">Why should you have a cat?</h2>
        <p className="have-a-cat__reasons">
          Having a cat around you can actually trigger the release of calming
          chemicals in your body which lower your stress and anxiety levels
        </p>
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
  );
}
