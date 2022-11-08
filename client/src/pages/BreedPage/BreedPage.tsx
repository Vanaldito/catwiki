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
    <main className="breed-page">
      <Navbar />
      {loading ? (
        <>Loading ...</>
      ) : (
        <div className="breed-info">
          <h2 className="breed-name">{breedInfo?.name}</h2>
          <p className="breed-description">{breedInfo?.description}</p>
          <BreedCharacteristics
            characteristics={{
              Temperament: breedInfo?.temperament,
              Origin: breedInfo?.origin,
              "Life span": breedInfo?.life_span
                ? `${breedInfo.life_span} years`
                : undefined,
              Adaptability: breedInfo?.adaptability ? (
                <LevelBar level={breedInfo.adaptability} />
              ) : undefined,
              "Affection level": breedInfo?.affection_level ? (
                <LevelBar level={breedInfo.affection_level} />
              ) : undefined,
              "Child friendly": breedInfo?.child_friendly ? (
                <LevelBar level={breedInfo.child_friendly} />
              ) : undefined,
              Grooming: breedInfo?.grooming ? (
                <LevelBar level={breedInfo.grooming} />
              ) : undefined,
              Intelligence: breedInfo?.intelligence ? (
                <LevelBar level={breedInfo.intelligence} />
              ) : undefined,
              "Health issues": breedInfo?.health_issues ? (
                <LevelBar level={breedInfo.health_issues} />
              ) : undefined,
              "Social needs": breedInfo?.social_needs ? (
                <LevelBar level={breedInfo.social_needs} />
              ) : undefined,
              "Stranger friendly": breedInfo?.stranger_friendly ? (
                <LevelBar level={breedInfo.stranger_friendly} />
              ) : undefined,
            }}
          />
        </div>
      )}
      <Footer />
    </main>
  );
}
