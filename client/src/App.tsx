import { Routes, Route } from "react-router-dom";

import { BreedPage, HomePage, MostSearchedBreedsPage } from "./pages";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/breed" element={<BreedPage />} />
      <Route
        path="/most-searched-breeds"
        element={<MostSearchedBreedsPage />}
      />
      <Route path="/*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
