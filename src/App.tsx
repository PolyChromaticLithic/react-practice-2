import React from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="bodyContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} /> {/* 404ページ */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
