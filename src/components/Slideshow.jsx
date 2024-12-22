import { useSavedArtworks } from "../context/SavedArtworksContext";
import SlideshowStyle from "../styles/SlideshowStyle";
import left from '../assets/images/left.svg';
import right from '../assets/images/right.svg';
import { useState, useEffect } from "react";
import badge from "../assets/images/badge.png";

function Slideshow() {
  const { savedArtworks } = useSavedArtworks()
  const [slide, setSlide] = useState(0)

  const nextSlide = () => {
    if (slide !== savedArtworks.length - 1) {
      setSlide(slide + 1)
    }
  }

  const prevSlide = () => {
    if (slide !== 0) {
      setSlide(slide - 1)
    }
  }
  

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [slide, savedArtworks.length])

  return (
    <SlideshowStyle>
      <div
        className="carousel"
        role="region"
        aria-labelledby="carousel-title"
        aria-live="polite"
      >
   

        <button
          className="arrows arrow-left"
          onClick={prevSlide}
          aria-label="Show previous slide"
          disabled={slide === 0}
        >
          <img src={left} alt="left arrow" title="left arrow" aria-hidden="true" />
        </button>

        {savedArtworks.map((artwork, index) => (
          <div
            key={index}
            className={slide === index ? "fancyFrame slide" : "fancyFrame slide-hidden"}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${savedArtworks.length}`}
          >
            <span className="indicators">
              {savedArtworks.map((_, index) => (
                <button
                  key={index}
                  className={slide === index ? "indicator" : "indicator-inactive"}
                  onClick={() => setSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={slide === index ? "true" : "false"}
                ></button>
              ))}
            </span>
            <img
              className="carouselImg"
              src={artwork.image}
              alt={artwork.title || "Untitled artwork"}
              title={artwork.title}
            />
          </div>
        ))}

        <button
          className="arrows arrow-right"
          onClick={nextSlide}
          aria-label="Show next slide"
          disabled={slide === savedArtworks.length - 1}
        >
          <img src={right} alt="right arrow" title="right arrow" aria-hidden="true" />
        </button>
      </div>
    </SlideshowStyle>
  )
}

export default Slideshow