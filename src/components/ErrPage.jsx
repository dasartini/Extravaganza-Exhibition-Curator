import SavedStyle from "../styles/SavedStyle"
import error from "../assets/images/404.jpg"
import { Link } from "react-router"
function ErrPage (){

    return(
        <>
          <SavedStyle>
            <Link to={"/"} aria-label="Return to the homepage">
              <h1 id="error-heading">Oops!</h1>
              <h2 id="error-description">
                Seems like this page does not exist.
              </h2>
              <p id="error-instruction">Click to go back.</p>
              <br />
              <img
                src={error}
                alt="Illustration of a 404 error: Page not found"
                title="Illustration of a 404 error: Page not found"
                style={{
                  borderRadius: "5%",
                  height: "30rem",
                  marginBottom: "1.5rem",
                }}
              />
            </Link>
          </SavedStyle>
        </>
      )
}

export default ErrPage