import React, { useState } from "react";
import "./Carousel.css";
import gotta from "./images/gotta.png";
import aura from "./images/aura.png";
import cleanse from "./images/cleanse.png";

const dummyImages = [gotta, aura, cleanse];
const Carousel = ({ handleCloseCarousel, setPlayingPronunciation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dummyImages.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === dummyImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="carousel">
      <div className="carousel-top">
        <div
          className="bg-primary"
          onClick={() => {
            // setPronunciationSrc(pronunciationSrc + "_Am.mp3")
            setPlayingPronunciation(true);
          }}
        >
          <span className="carousel-top-icon vp-AmP"></span> <span>Am</span>
        </div>
        <div
          className="bg-warning "
          onClick={() => {
            // setPronunciationSrc(pronunciationSrc + "_Am.mp3")
            setPlayingPronunciation(true);
          }}
        >
          <span className="carousel-top-icon vp-BrP"></span> <span>Br</span>
        </div>

        <div className="bg-danger " onClick={handleCloseCarousel}>
          <span className="carousel-top-icon vp-modal-close "></span>
          <span>Close</span>
        </div>
      </div>
      <img src={dummyImages[currentIndex]} />
      <p> ترجمه فارسی</p>
      <p> ترجمه فارسی</p>
      <button className="carousel-btn-prev" onClick={prevSlide}></button>
      <button className="carousel-btn-next" onClick={nextSlide}></button>
    </div>
  );
};

export default Carousel;
