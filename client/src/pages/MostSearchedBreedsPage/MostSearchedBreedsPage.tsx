import { useEffect, useState } from "react";
import { Footer, Loader, Navbar } from "../../components";
import { useFetchAndLoad } from "../../hooks";
import { SearchedBreedInfo } from "../../models";
import { getMostSearchedBreeds } from "../../services";

import "./MostSearchedBreedsPage.css";

export default function MostSearchedBreedsPage() {
  const [mostSearchedBreeds, setMostSearchedBreeds] = useState<
    SearchedBreedInfo[] | null
  >(null);

  const { loading, callEndpoint } = useFetchAndLoad();

  useEffect(() => {
    callEndpoint(getMostSearchedBreeds()).then(data => {
      if (data.status === 200 && data.info) {
        setMostSearchedBreeds(data.info);
      }
    });
  }, []);

  return (
    <div className="most-searched-breeds-page">
      <Navbar />
      <main>
        <h1 className="most-searched-breeds-page__title">
          Top 10 most searched breeds
        </h1>
        {loading ? (
          <Loader />
        ) : (
          <ol className="most-searched-breeds-page__breeds">
            {mostSearchedBreeds?.map((breed, index) => (
              <li
                className="most-searched-breeds-page__breed"
                key={breed.breedName}
              >
                <img
                  className="most-searched-breeds-page__breed__image"
                  src={`/images/${breed.breedImageId}`}
                  alt="Breed reference image"
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
        )}
      </main>
      <Footer />
    </div>
  );
}
