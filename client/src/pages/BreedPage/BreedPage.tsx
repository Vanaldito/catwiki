import { useLocation } from "react-router-dom";

export default function BreedPage() {
  const location = useLocation();

  const breedName = new URLSearchParams(location.search).get("name");

  return <div>{breedName}</div>;
}
