import React from "react";
import { Routes, Route, Router, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Works from "./pages/Works";
import NotFound from "./pages/NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer"

function App() {
  
  return (
    <BrowserRouter>
      <div className="wrapper">
        <Navbar />
        <div className="bodyContent">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/works" element={<Works />} />
            <Route path="*" element={<NotFound />} /> {/* 404ページ */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
