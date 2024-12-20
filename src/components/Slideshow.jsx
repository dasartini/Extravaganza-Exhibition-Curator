import { useSavedArtworks } from "../context/SavedArtworksContext";
import SlideshowStyle from "../styles/SlideshowStyle";
import left from '../assets/images/left.svg';
import right from '../assets/images/right.svg';
import { useState } from "react";
import badge from "../assets/images/badge.png"

function Slideshow() {
  const { savedArtworks } = useSavedArtworks()
  const [slide, setSlide] = useState(0)

  const nextSlide = () => {
    if (slide !== savedArtworks.length - 1) {
      setSlide(slide + 1);
    }
  }

  const prevSlide = () => {
    if (slide !== 0) {
      setSlide(slide - 1);
    }
  }

  return (
    <SlideshowStyle>
      <div className="carousel">
        <span className="arrows arrow-left" onClick={prevSlide}>
          <img src={left} alt="Previous slide" />
        </span>
        {savedArtworks.map((artwork, index) => (
          <div
            key={index}
            className={slide === index ? "fancyFrame slide" : "fancyFrame slide-hidden"}
          >
            <img className="carouselImg"
              src={artwork.image}
              alt={artwork.title}
              title={artwork.title}
            />
            <div className="badgecont">
              <img className="badge" src={badge} alt="Badge" />
              <div className="textCont">
                <p className={artwork.title.length > 20 ? "badgeTitle" : "badgeTitleShort"}>{artwork.title}</p>
                <p className={artwork.title.length > 20 ? "badgeAuthor" : "badgeAuthorShort "}>{artwork.artist}</p>
              </div>
            </div>


          </div>
        ))}
        <span className="arrows arrow-right" onClick={nextSlide}>
          <img src={right} alt="Next slide" />
        </span>
        <span className="indicators">
          {savedArtworks.map((_, index) => (
            <button
              key={index}
              className={slide === index ? "indicator" : "indicator-inactive"}
              onClick={() => setSlide(index)}
            ></button>
          ))}
        </span>
      </div>
    </SlideshowStyle>
  );
}

export default Slideshow
