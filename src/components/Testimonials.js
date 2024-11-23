import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Michael Brown",
    text: "The ambiance is lovely and the food is top-notch. Highly recommended!",
    rating: 5,
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    text: "Great service and delicious food. Will come back again!",
    rating: 4,
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    name: "John Smith",
    text: "One of the best dining experiences I’ve had in a while.",
    rating: 5,
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 4,
    name: "Emily Davis",
    text: "Good food but service could be improved.",
    rating: 3,
    avatar: "https://via.placeholder.com/50",
  },
  {
    id: 5,
    name: "Chris Thompson",
    text: "Amazing place! I loved the ambiance and the food.",
    rating: 5,
    avatar: "https://via.placeholder.com/50",
  },
];

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,  // Show only one card on small screens
          slidesToScroll: 1,
          dots: true,
          arrows: false,
          centerMode: true,  // Ensure the card is centered
          centerPadding: '20px',  // Padding around the center card for better visibility
        },
      },
    ],
  };
  

  return (
    <div className="container">
      <Slider {...settings}>
        {reviews.map((review, index) => {
          const isMiddleCard = (currentSlide + 1) % reviews.length === index;
          const isFirstCard = currentSlide === index; // Determine if it's the first card

          return (
            <div
              key={review.id}
              className={`card-wrapper ${isMiddleCard ? "middle-card" : ""} 
                ${isFirstCard ? "first-card" : ""}`}
            >
              <div
                className={`review-card text-light ${
                  isMiddleCard ? "highlight-card" : ""
                }`}
              >
                <span className="icon-container">
                  <FaQuoteLeft className="quote-icon-back" />
                </span>
                <div
                  className={`review-content `}
                >
                  <p className="review-text text-center">{review.text}</p>
                  <div className="author-info">
                    <p className="name text-end">- {review.name}</p>
                  </div>
                </div>
              </div>

             
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Testimonials;
