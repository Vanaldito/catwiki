import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages";

import "./App.css";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}
