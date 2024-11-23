import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import routing components
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./navigations/Home";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import Gallery from "./components/gallery/Gallery";
import ScrollToTop from "./components/scrolltop/ScrollToTop";

function App() {
  const [showSocialButtons, setShowSocialButtons] = useState(false);

  const toggleSocialButtons = () => {
    setShowSocialButtons(!showSocialButtons);
  };

  return (
    <Router>
      <div className="App">
        <Header />

        {/* Define Routes Here */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
        </Routes>

        <Footer />

        {/* Floating Social Media Buttons for Desktop */}
        <div className="social-icons d-none d-md-flex flex-column position-fixed">
          <a
            href="https://facebook.com"
            className="btn btn-primary mb-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            className="btn btn-info mb-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="btn btn-danger"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </a>
        </div>

        {/* Floating Action Button for Small Screens */}
        <div className="fab-container d-md-none">
          <button className="fab btn btn-dark" onClick={toggleSocialButtons}>
            {showSocialButtons ? <FaTimes /> : <FaBars />}
          </button>
          {showSocialButtons && (
            <div className="fab-icons d-flex flex-column">
              <a
                href="https://facebook.com"
                className="btn btn-primary mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://twitter.com"
                className="btn btn-info mb-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://instagram.com"
                className="btn btn-danger"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          )}
        </div>
        <ScrollToTop/>
      </div>
    </Router>
  );
}

export default App;
