import React, { useEffect, useState } from "react";
import { FaChevronUp } from "react-icons/fa"; // Import an icon for the button
import './ScrollToTop.css'; // Create a CSS file for styles

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`scroll-to-top ${visible ? "visible" : ""}`} onClick={scrollToTop}>
      <FaChevronUp />
    </div>
  );
};

export default ScrollToTop;
