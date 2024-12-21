import { useState, useEffect } from "react";
import { getArtworksOther } from "../api";
import Boxie from "../styles/Boxie";
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";
import noImage from "../assets/images/noImage2.jpg";
import Loader from "./Loader";
import GoBackButton from "./GoBack";
import nomatch from "../assets/images/nomatch.jpg";
import noconnection from "../assets/images/noconnection.jpg";
import { usePaginationContext } from "../context/PaginationContext";
import { useLocation } from "react-router";

function AllArtworks2() {
  const { visible, setVisible } = useVisibleContext()
  const { query } = useSearchContext()
  const { num, setNum } = usePaginationContext()
  const [artworks, setArtworks] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    if (location.state?.num !== undefined) {
      setNum(location.state.num)
    }
  }, [location.state, setNum])

  useEffect(() => {
    setLoading(true)
    getArtworksOther(num, query)
      .then((data) => {
        setArtworks(data)
        setError(null)
        window.scrollTo({ top: 0, behavior: "smooth" })
      })
      .catch((err) => {
        setError(err.message)
        setArtworks([])
      })
      .finally(() => setLoading(false))
    setVisible(false)
  }, [num, query, setVisible])

  const handleClick = () => setNum((prevNum) => prevNum + 30);
  const handlePrev = () => setNum((prevNum) => Math.max(prevNum - 30, 0))

  return (
    <Boxie>
      <GoBackButton />
      <div className="allArtworks">
        {loading ? (
          <>
            <Loader />
          </>
        ) : error ? (
          <>
            <p id="error-message" aria-live="assertive">
              Error: no network available.
            </p>
            <img
              className="noMatch"
              title="You have no connection"
              alt="No connection"
              src={noconnection}
            />
          </>
        ) : artworks.length === 0 ? (
          <>
            <p id="no-results" aria-live="polite">
              No artworks found for your search.
            </p>
            <img
              className="noMatch"
              title="No artworks found for your search criteria"
              alt="No results"
              src={nomatch}
            />
          </>
        ) : (
          <div
            className="image-container"
            aria-label="List of artworks"
            role="list"
          >
            {artworks.map((art, index) => (
              <div
                key={index}
                className="item"
                role="listitem"
                aria-labelledby={`art-title-${index}`}
              >
                <Link
                  to={`/cleveland-art-museum/${art.id}`}
                  state={{ num }}
                >
                  <img
                    src={art.images?.web?.url || noImage}
                    alt={art.title || "Untitled artwork"}
                    className="itemImage"
                  />
                  <p
                    id={`art-title-${index}`}
                    className="itemTitle"
                    title={art.title}
                  >
                    {art.title || "Untitled"}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="pagination-buttons">
          {num > 0 && !error && (
            <button
              className="boxshadow"
              style={{ height: "50px", width: "100px", marginRight: "10px" }}
              onClick={handlePrev}
              aria-label="Go to the previous page"
            >
              Prev
            </button>
          )}
          {artworks.length > 0 && !error && (
            <button
              className="boxshadow"
              style={{ height: "50px", width: "100px" }}
              onClick={handleClick}
              aria-label="Go to the next page"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </Boxie>
  )
}

export default AllArtworks2
