import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Footer, LevelBar, Navbar } from "../../components";
import { BreedCharacteristics } from "../../components/BreedCharacteristics";
import { BreedInfo } from "../../models";
import { searchBreeds } from "../../services";

import "./BreedPage.css";

export default function BreedPage() {
  const [breedInfo, setBreedInfo] = useState<BreedInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  const breedName = new URLSearchParams(location.search).get("name");

  useEffect(() => {
    if (!breedName) return setLoading(false);

    const { controller, call } = searchBreeds(breedName);

    call.then(data => {
      if (data.status === 200 && data.info && data.info.length > 0) {
        setBreedInfo(data.info[0]);
      }
      setLoading(false);
    });

    return () => {
      controller.abort();
    };
  }, []);

  if (!loading && !breedInfo)
    return (
      <main className="breed-page">
        <Navbar />
        <>Breed not found</>
        <Footer />
      </main>
    );

  return (
    <div className="breed-page">
      <Navbar />
      <main>
        {loading ? (
          <>Loading ...</>
        ) : (
          <div className="breed-info">
            <img
              className="breed-reference-image"
              src={`/images/${breedInfo?.reference_image_id}`}
              alt="Breed reference image"
              width={370}
              height={370}
            />
            <div className="breed-info__right-side">
              <h2 className="breed-name">{breedInfo?.name}</h2>
              <p className="breed-description">
                {breedInfo?.description ?? "No description to display"}
              </p>
              <BreedCharacteristics
                characteristics={{
                  Temperament: breedInfo?.temperament ?? "Temperament unknowed",
                  Origin: breedInfo?.origin ?? "Origin unknowed",
                  "Life span": breedInfo?.life_span
                    ? `${breedInfo.life_span} years`
                    : "Life span unknowed",
                  Adaptability: breedInfo?.adaptability ? (
                    <LevelBar level={breedInfo.adaptability} />
                  ) : (
                    "Adaptability unknowed"
                  ),
                  "Affection level": breedInfo?.affection_level ? (
                    <LevelBar level={breedInfo.affection_level} />
                  ) : (
                    "Affection level unknowed"
                  ),
                  "Child friendly": breedInfo?.child_friendly ? (
                    <LevelBar level={breedInfo.child_friendly} />
                  ) : (
                    "Child friendly unknowed"
                  ),
                  Grooming: breedInfo?.grooming ? (
                    <LevelBar level={breedInfo.grooming} />
                  ) : (
                    "Grooming unknowed"
                  ),
                  Intelligence: breedInfo?.intelligence ? (
                    <LevelBar level={breedInfo.intelligence} />
                  ) : (
                    "Intelligence unknowed"
                  ),
                  "Health issues": breedInfo?.health_issues ? (
                    <LevelBar level={breedInfo.health_issues} />
                  ) : (
                    "Health issues unknowed"
                  ),
                  "Social needs": breedInfo?.social_needs ? (
                    <LevelBar level={breedInfo.social_needs} />
                  ) : (
                    "Social needs unknowed"
                  ),
                  "Stranger friendly": breedInfo?.stranger_friendly ? (
                    <LevelBar level={breedInfo.stranger_friendly} />
                  ) : (
                    "Stranger friendly unknowed"
                  ),
                }}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
