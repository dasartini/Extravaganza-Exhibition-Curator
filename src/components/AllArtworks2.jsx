import { useState, useEffect } from "react";
import { getArtworksOther } from "../api";
import Boxie from "../styles/Boxie";
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";

function AllArtworks2() {
  const { visible, setVisible } = useVisibleContext();
  const { query } = useSearchContext();

  const [artworks, setArtworks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [num, setNum] = useState(0);

  const fetchArtworks = (pageNum, searchQuery = "") => {
    setLoading(true);
    getArtworksOther(pageNum, searchQuery)
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    setNum(0); // Reset pagination when query changes
    fetchArtworks(0, query); // Fetch first page with the updated query
    setVisible(false);
  }, [query]);

  useEffect(() => {
    fetchArtworks(num, query); // Fetch artworks on pagination change
  }, [num]);

  const handleClick = () => {
    setNum((prevNum) => prevNum + 8);
  };

  const handlePrev = () => {
    if (num >= 8) {
      setNum((prevNum) => prevNum - 8);
    }
  };

  return (
    <Boxie>
      <div className="latestNews">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : artworks.length === 0 ? (
          <p>No artworks found for your search.</p>
        ) : (
          <div className="image-container">
            {artworks.map((art, index) => (
              <div key={index} className="item">
                <img
                  src={art.images?.web?.url || "placeholder.jpg"}
                  alt={art.title || "Untitled"}
                  className="itemImage"
                />
                <Link to={`/clevelandartmuseum/${art.id}`}>
                  <p className="itemTitle" title={art.title}>
                    {art.title || "Untitled"}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="pagination-buttons" style={{ marginTop: "20px" }}>
          {num > 0 && (
            <button
              style={{ height: "50px", width: "100px", marginRight: "10px" }}
              onClick={handlePrev}
            >
              Prev
            </button>
          )}
          <button
            style={{ height: "50px", width: "100px" }}
            onClick={handleClick}
          >
            Next
          </button>
        </div>
      </div>
    </Boxie>
  );
}

export default AllArtworks2;
