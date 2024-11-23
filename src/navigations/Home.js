import React, { useEffect, useRef, useState } from "react";
import video from "../assets/videos/hero1.mp4";
import event1 from "../assets/event1.jpg";
import event2 from "../assets/event2.jpg";
import event3 from "../assets/event3.jpg";
import event4 from "../assets/event4.jpg";
import "./Home.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import Testimonials from "../components/Testimonials";

const countersData = [
  { id: 1, target: 10000, label: "Events Created" },
  { id: 2, target: 65000, label: "Plates Served Per Year" },
  { id: 3, target: 100, label: "On-Time Delivery Record" },
  { id: 4, target: 19, label: "Years Of Experience" },
];
const events = [
  {
    title: "Wedding Catering",
    image: event2, // Replace with real event image URL
    description: "Elegant wedding catering with a wide selection of food.",
    link: "/wedding-catering",
  },
  {
    title: "Corporate Events",
    image: event3, // Replace with real event image URL
    description:
      "Professional catering services for corporate events and meetings.",
    link: "/corporate-events",
  },
  {
    title: "Birthday Parties",
    image: event1, // Replace with real event image URL
    description: "Custom birthday party packages with personalized catering.",
    link: "/birthday-parties",
  },
  {
    title: "Outdoor BBQs",
    image: event4, // Replace with real event image URL
    description: "Enjoy a fun-filled BBQ event with your friends and family.",
    link: "/outdoor-bbqs",
  },
];
const Home = () => {
  const [counts, setCounts] = useState(countersData.map(() => 0));
  const [hasCounted, setHasCounted] = useState(false);
  const countersRefs = useRef([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState("");

  const formRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create form data object
    const formData = {
      access_key: "6b9a067f-cf6d-4caf-aaa5-b4ed0b0d3041",
      name,
      phone,
      message,
    };

    // Convert form data to JSON format
    const json = JSON.stringify(formData);

    // Show a waiting message
    setResult("Please wait...");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const resultJson = await response.json();

      if (response.status === 200) {
        setResult(resultJson.message);
        setSubmitted(true);
      } else {
        setResult(resultJson.message);
        setSubmitted(false);
      }
    } catch (error) {
      setResult("Something went wrong!");
      console.log(error);
    }

    // Clear form fields after successful submission
    if (formRef.current) {
      formRef.current.reset();
    }
    setTimeout(() => {
      setResult("");
    }, 3000);
  };
  useEffect(() => {
    // Smooth scroll to the about section if the URL has a hash
    if (window.location.hash) {
      const element = document.getElementById(
        window.location.hash.substring(1)
      );
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasCounted) {
          setHasCounted(true);
          animateCounts();
        }
      },
      { threshold: 0.5 }
    );
  
    const currentRefs = countersRefs.current;
    if (currentRefs[0]) {
      currentRefs.forEach((ref) => {
        observer.observe(ref);
      });
    }
  
    return () => {
      if (currentRefs[0]) {
        currentRefs.forEach((ref) => {
          observer.unobserve(ref);
        });
      }
    };
  }, [hasCounted]);
  
  if (submitted) {
    // Display a message or navigate to another page
  }
  const animateCounts = () => {
    const duration = 1000; // 1 second
    const intervalTime = 10; // Interval time in ms
    countersData.forEach((counter, index) => {
      const increment = counter.target / (duration / intervalTime);
      const target = counter.target;

      const counterInterval = setInterval(() => {
        setCounts((prevCounts) => {
          if (prevCounts[index] + increment >= target) {
            clearInterval(counterInterval);
            return prevCounts.map((count, idx) =>
              idx === index ? target : count
            );
          }
          return prevCounts.map((count, idx) =>
            idx === index ? count + increment : count
          );
        });
      }, intervalTime);
    });
  };

  return (
    <div>
      {/*Banner Section*/}
      <div className="video-container position-relative">
        <video className="d-block w-100 video-blur" autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="video-text-overlay">
        <div className="welcome-text">
          Welcome to kanakadurga Catering & Supplies
        </div>
      </div>
      {/* About Section */}
      <div id="about" className="container-fluid py-5 ">
        <div className="container">
          <div className="row g-7 align-items-center">
            <div className="col-lg-2 border-end border-3 pe-5 me-3 d-none d-lg-block">
              <h1 className="section-title text-light ff-secondary text-start text-uppercase fw-bold">
                About Us
              </h1>
            </div>
            <div className="col-12 d-block d-lg-none pe-5">
              <h1 className="section-title text-light ff-secondary text-start text-uppercase fw-bold">
                About Us
              </h1>
            </div>

            <div className="col-lg-9">
              <p className="fs-5 text-start text-light mt-2">
                We provide high-quality, customizable catering options to suit
                any event, from intimate gatherings to large-scale celebrations.
                We also supply essential event equipment like tent houses,
                lighting, and more to ensure every occasion is perfectly
                executed. We serve to make every event not just successful but
                truly memorable for our clients.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Services Section */}
      <div className="services-section container-xxl py-5">
        <h2 className="text-center event-main mb-5 fw-bold">Our Services</h2>
        <div className="row justify-content-center">
          {/* Card 1: Catering Services */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card sweeperCard">
              <div className="containers">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                  >
                    <path
                      d="M14 14L4 8L14 2L24 8L14 14Z"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4 8V15C4 20 10 23 14 23C18 23 24 20 24 15V8"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="title my-3">Catering Services</div>
                <div className="subtitle">
                  Premium catering for weddings, corporate events, and private
                  parties.
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Event Planning */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card sweeperCard">
              <div className="containers">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                  >
                    <path
                      d="M14 1.5L14 27.5"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 14H27"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="title my-3">Event Planning</div>
                <div className="subtitle">
                  Seamless event coordination for a stress-free experience.
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Equipment Rental */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card sweeperCard">
              <div className="containers">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                  >
                    <circle
                      cx="14"
                      cy="14.5"
                      r="10"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M14 8V14L18 18"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="title my-3">Equipment Rental</div>
                <div className="subtitle">
                  High-quality supplies to make your event unforgettable.
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Food Supply */}
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="card sweeperCard">
              <div className="containers">
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="29"
                    viewBox="0 0 28 29"
                    fill="none"
                  >
                    <path
                      d="M5 5H23V23H5V5Z"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9 13H19"
                      stroke="#b91c1c"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="title my-3">Food Supplies</div>
                <div className="subtitle">
                  Fresh ingredients for your culinary needs and event menu.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* .Events Section */}
      <div className=" events-section conatiner-fluid  ">
        <div className=" container-xxl py-5" id="events">
          <h2 className="text-center event-main mb-5 fw-bold">
            Events Organized by Us
          </h2>
          <div className="row ">
            {events.map((event, index) => (
              <div className="col-md-3 col-sm-6 mb-4" key={index}>
                <div className="event-card">
                  <div
                    className="event-image"
                    style={{ backgroundImage: `url(${event.image})` }}
                  >
                    <h5 className="event-head text-light">{event.title}</h5>

                    <div className="event-content">
                      <h5 className="event-title">{event.title}</h5>
                      <p className="event-description">{event.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Experience */}
      <div className="container-fluid position-relative text-dark Experience">
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark opacity-50"></div>
        <div className="position-relative z-1 p-5 container-xxl text-start Experience-content">
          {/* Experience Heading */}
          <h2 className="text-light event-main mb-6 fw-bold">
            Experience We Have
          </h2>

          {/* Counters in One Row with Dividers */}
          <div className="row mt-5 justify-content-center align-items-center">
            {/* Counter 1 */}
            <div
              className="col-md-2 col-12 text-center counter1"
              ref={(el) => (countersRefs.current[0] = el)}
            >
              <h1>{Math.floor(counts[0])}+</h1>
              <h4 className="text-light">{countersData[0].label}</h4>
            </div>

            {/* Divider */}
            <div className="col-md-1 text-center d-flex align-items-center justify-content-center d-none d-md-block">
              <div
                className="border-start border-white"
                style={{ height: "90px" }}
              ></div>
            </div>

            {/* Counter 2 */}
            <div
              className="col-md-2 col-12 text-center counter2"
              ref={(el) => (countersRefs.current[1] = el)}
            >
              <h1>{Math.floor(counts[1])}+</h1>
              <h4 className="text-light">{countersData[1].label}</h4>
            </div>

            {/* Divider */}
            <div className="col-md-1 text-center d-flex align-items-center justify-content-center d-none d-md-block">
              <div
                className="border-start border-white"
                style={{ height: "90px" }}
              ></div>
            </div>

            {/* Counter 3 */}
            <div
              className="col-md-2 col-12 text-center counter1"
              ref={(el) => (countersRefs.current[2] = el)}
            >
              <h1>{Math.floor(counts[2])}+</h1>
              <h4 className="text-light">{countersData[2].label}</h4>
            </div>

            {/* Divider */}
            <div className="col-md-1 text-center d-flex align-items-center justify-content-center d-none d-md-block">
              <div
                className="border-start border-white"
                style={{ height: "90px" }}
              ></div>
            </div>

            {/* Counter 4 */}
            <div
              className="col-md-2 col-12 text-center counter2"
              ref={(el) => (countersRefs.current[3] = el)}
            >
              <h1>{Math.floor(counts[3])}+</h1>
              <h4 className="text-light">{countersData[3].label}</h4>
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div class="container-fluid  py-5">
        <div class="container-xxl">
          <h1 className="text-center mb-4 event-main text-color">
            Our Customer's Review
          </h1>
          <Testimonials />
        </div>
      </div>
      {/*Contact Section*/}
      <div className="container-fluid  contact-section py-5 ">
        <div className="container-xxl ">
          <h2 className=" event-main mb-0 fw-bold">Contact Info</h2>
          <div className="row mt-4">
            <div className="col-lg-5 col-sm-12">
              <div className="contact-info">
                <div className="info-item">
                  <FaPhoneAlt className="contact-icon" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="info-item">
                  <FaEnvelope className="contact-icon " />
                  <span>info@anushacaterers.com</span>
                </div>
                <div className="info-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>123, Main Road, Visakhapatnam, India</span>
                </div>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.7305905916432!2d83.34257537421958!3d17.804354390661263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x11439a67374d7327%3A0x46ea10d91ee0640d!2sAnusha%20Caterers%20%26%20Lighting%20Suppliers!5e0!3m2!1sen!2sin!4v1728241149958!5m2!1sen!2sin"
                  height="250"
                  width="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location of Anusha Caterers & Lighting Suppliers on Google Maps"
                ></iframe>
              </div>
            </div>

            <div className="col-lg-7 col-sm-12">
              <div className="contact-form-container">
                <h4 className="contact-title  fs-3 fw-bold">Get In Touch</h4>
                <form
                  ref={formRef}
                  className="contact-form text-start"
                  onSubmit={handleSubmit}
                >
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      aria-label="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      aria-label="Phone Number"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">
                      Message
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      rows="4"
                      placeholder="Write your message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      aria-label="Message"
                    ></textarea>
                  </div>
                  <button type="submit" className=" send-btn">
                    <span className="text-light">Send</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 74 74"
                      height="34"
                      width="34"
                    >
                      <circle
                        stroke-width="3"
                        stroke="white"
                        r="35.5"
                        cy="37"
                        cx="37"
                      ></circle>
                      <path
                        fill="white"
                        d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
                      ></path>
                    </svg>
                  </button>
                </form>
                {result && (
                  <div className="alert alert-success mt-3">{result}</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
