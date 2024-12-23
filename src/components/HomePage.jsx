import HomePageStyle from "../styles/HomePageStyle";
import image from "../assets/images/homepageImg.jpg";
import { Link } from "react-router";

function HomePage() {

  return (
    <>
      <HomePageStyle>
        <div className="homePageCont" role="main" aria-labelledby="main-heading">
          <h1 id="main-heading">EXTRAVAGANZA</h1>
          <br />
          <div className="quote" aria-labelledby="quote-heading">
            <img
              className="quoteImg"
              src={image}
              alt="A vibrant artistic representation"
            />
            <h3 id="quote-heading">
              "<b>Art cannot be criticised because every mistake is a new creation.</b>" – Mr. Brainwash
            </h3>
          </div>
          <br />
          <div
            className="homePageText"
            aria-labelledby="definition-heading"
            role="region"
          >
            <h2 id="definition-heading">Definition of Extravaganza</h2>
            <p>
              According to the Cambridge dictionary, <i>extravaganza</i> means:
            </p>
            <blockquote>
              <i>"a large, exciting, and expensive event or entertainment"</i>
            </blockquote> <br></br>
            <p>
              For me, as an art lover, <i>Extravaganza</i> means something amazing – something that represents an escape
              from routine. Something remarkable, capable of leaving a lasting impact on the collective mind.
            </p>
            <p>
              Taking art and history as inspiration, this web application allows you to explore amazing artworks from
              famous museums worldwide.
            </p>
            <p>
              Here, you will discover many renowned artists who have left their mark on the world. But you will also
              encounter artists whose names you may not recognise, yet whose works are equally extraordinary.
            </p>
            <p>
              Feel free to navigate between the different museums available. You can also add artworks to your personal
              gallery and reorder them however you like.
            </p>
            <p>And the best part? You can show your gallery with friends in a slideshow.</p> <br></br>
            <p>Enjoy exploring the ways different souls express themselves.</p> <br></br>
          </div>
          <br />
          <mark
            style={{ background: "#000", color: "#fff" }}
            role="button"
            tabIndex={0}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Explore the museums"
          >
            <Link to={"/museums"}>
              <h3>Explore the museums</h3>
            </Link>
          </mark>
        </div>
      </HomePageStyle>
    </>
  );

}

export default HomePage