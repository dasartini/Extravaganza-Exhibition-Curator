import { useState, useEffect } from "react";
import { usePageContext } from "../context/PageContext";
import { getArtworks } from "../api";
import Boxie from "../styles/Boxie";
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";
import DynamicImage from "./DynamicImage";
import noImage from "../assets/images/noImage2.jpg"

function AllArtworks() {
    const { visible, setVisible } = useVisibleContext()
    const { chicagoQuery } = useSearchContext()
    const { currentPage, setCurrentPage } = usePageContext()
    const [artworks, setArtworks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchArtworks = (pageNum, searchQuery) => {
        setLoading(true)
        getArtworks(pageNum, searchQuery)
            .then((data) => {
                console.log(data)
                setArtworks(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }
    const renderImage = (art, noImage) => {
        if (art.image_id === null) {
          return (
            <img
              src={noImage}
              alt="No artwork available"
              className="itemImage"
            />
          );
        } else if (art.image_id) {
          return (
            <img
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg`}
              alt={art.title || "Untitled"}
              className="itemImage"
            />
          );
        } else if (art.image_id === undefined) {
          return <DynamicImage singleArtworkId={art.id} />;
        }
      };
      

    useEffect(() => {
        fetchArtworks(currentPage, chicagoQuery)
        setVisible(false)
    }, [currentPage, chicagoQuery])

    const handleNext = () => {
        setCurrentPage((prevPage) => prevPage + 1)
    }

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1)
        }
    }
    return (
        <>
            <Boxie>
                <div className="allArtworks">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div className="image-container">
                            {artworks.map((art, index) => (
                                <div key={index} className="item">
                                    {renderImage(art, noImage)}

                                    
                                   
                                    <Link to={`/chicago-institute-of-art/${art.id}`}>
                                        <p className="itemTitle" title={art.title}>
                                            {art.title || "Untitled"}
                                        </p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="pagination-buttons" style={{ marginTop: "20px" }}>
                        {currentPage > 1 && (
                            <button className="boxshadow"
                                style={{ height: "50px", width: "100px", marginRight: "10px" }}
                                onClick={handlePrev}
                            >
                                Prev
                            </button>
                        )}
                        <button className="boxshadow"
                            style={{ height: "50px", width: "100px" }}
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </Boxie>
        </>
    );
}

export default AllArtworks
