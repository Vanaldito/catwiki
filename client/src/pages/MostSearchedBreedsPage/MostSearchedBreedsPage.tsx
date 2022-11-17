import { useEffect, useState } from "react";
import { Footer, Navbar } from "../../components";
import { SearchedBreedInfo } from "../../models";
import getMostSearchedBreeds from "../../services/getMostSearchedBreeds.service";

import "./MostSearchedBreedsPage.css";

export default function MostSearchedBreedsPage() {
  const [mostSearchedBreeds, setMostSearchedBreeds] = useState<
    SearchedBreedInfo[] | null
  >(null);

  useEffect(() => {
    const { call, controller } = getMostSearchedBreeds();

    call.then(data => {
      if (data.status === 200 && data.info) {
        setMostSearchedBreeds(data.info);
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div className="most-searched-breeds-page">
      <Navbar />
      <main>
        <h1 className="most-searched-breeds-page__title">
          Top 10 most searched breeds
        </h1>
        <ol className="most-searched-breeds-page__breeds">
          {mostSearchedBreeds?.map((breed, index) => (
            <li
              className="most-searched-breeds-page__breed"
              key={breed.breedName}
            >
              <img
                className="most-searched-breeds-page__breed__image"
                src={`/images/${breed.breedImageId}`}
              />
              <div className="most-searched-breeds-page__breed__info">
                <h2 className="most-searched-breeds-page__breed__name">
                  {index + 1}. {breed.breedName}
                </h2>
                <p className="most-searched-breeds-page__breed__description">
                  {breed.breedDescription}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>
      <Footer />
    </div>
  );
}
