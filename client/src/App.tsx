import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Loader } from "./components";

import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const BreedPage = lazy(() => import("./pages/BreedPage/BreedPage"));
const MostSearchedBreedsPage = lazy(
  () => import("./pages/MostSearchedBreedsPage/MostSearchedBreedsPage")
);

export default function App() {
  return (
    <React.Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/breed" element={<BreedPage />} />
        <Route
          path="/most-searched-breeds"
          element={<MostSearchedBreedsPage />}
        />
        <Route path="/*" element={<div>404 Not Found</div>} />
      </Routes>
    </React.Suspense>
  );
}
