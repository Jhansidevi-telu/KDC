import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./Gallery.css";
import image1 from "../../assets/home.jpg";
import image2 from "../../assets/event1.jpg";
import singleVideo from "../../assets/videos/gallery.mp4";

const Gallery = () => {
  const data = [
    { id: 1, imgSrc: image1 },
    { id: 2, imgSrc: image2 },
  ];

  const [model, setModel] = useState(false);
  const [tempimgSrc, setTempImgSrc] = useState("");

  const videoRef = useRef(null);

  const getImg = (imgSrc) => {
    setModel(true);
    setTempImgSrc(imgSrc);
  };

  const closeModal = () => {
    setModel(false);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.play();
    }
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div className="position-relative text-center">
        <video
          className="w-100"
          ref={videoRef}
          autoPlay
          muted
          loop
          style={{ height: "50vh", objectFit: "cover" }}
        >
          <source src={singleVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1 className="position-absolute top-50 start-50 translate-middle text-white">
          Welcome to the Image Gallery
        </h1>
      </div>

      {/* Modal Section */}
      {model && (
        <div
          className="modal d-block"
          tabIndex="-1"
          onClick={closeModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close  position-absolute top-0 end-0 m-3"
                aria-label="Close"
                onClick={closeModal}
              ></button>
              <img
                src={tempimgSrc}
                alt="Enlarged View"
                className="img-fluid"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}

      {/* Gallery Section */}
      <div className="container-xxl py-2">
        <div className="row g-3">
          {data.map((item, index) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={index}
              onClick={() => getImg(item.imgSrc)}
            >
              <div className="gallery-card border-0 shadow-sm">
                <img
                  src={item.imgSrc}
                  alt="Gallery Item"
                  className="card-img-top"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
