import { useState, useEffect } from "react";
import { usePageContext } from "../context/PageContext";
import { getArtworks } from "../api";
import Boxie from "../styles/Boxie";
import { Link } from "react-router";
import { useVisibleContext } from "../context/VisibleContext";
import { useSearchContext } from "../context/SearchContext";
import DynamicImage from "./DynamicImage";
import noImage from "../assets/images/noImage2.jpg"
import Loader from "./Loader";
import GoBackButton from "./GoBack";
import nomatch from "../assets/images/nomatch.jpg"
import noconnection from "../assets/images/noconnection.jpg"

function AllArtworks() {
    const { visible, setVisible } = useVisibleContext()
    const { chicagoQuery } = useSearchContext()
    const { currentPage, setCurrentPage } = usePageContext()
    const [artworks, setArtworks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [imgErrors, setImgErrors] = useState({})


    const fetchArtworks = (pageNum, searchQuery) => {
        setLoading(true)
        getArtworks(pageNum, searchQuery)
            .then((data) => {
                setArtworks(data)
                setLoading(false)
                window.scrollTo({ top: 0, behavior: "smooth" })

            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }
    const handleImgError = (imageId) => {
        setImgErrors((prev) => ({ ...prev, [imageId]: true }))
      }
    
      const renderImage = (art, noImage) => {
        if (imgErrors[art.image_id] || art.image_id === null) {
          return (
            <img
              src={noImage}
              alt="No artwork available"
              className="itemImage"
            />
          )
        } else if (art.image_id) {
          return (
            <img
              src={`https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`}
              alt={art.title || "Untitled"}
              className="itemImage"
              onError={() => handleImgError(art.image_id)} 
            />
          )
        } else if (art.image_id === undefined) {
          return <DynamicImage singleArtworkId={art.id} />
        }
      }
      

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
            <GoBackButton />
            <main className="allArtworks" aria-live="polite">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <>
                        <p role="alert">Error: No network available.</p>
                        <img
                            className="noMatch"
                            title="You have no connection"
                            alt="No connection"
                            src={noconnection}
                        />
                    </>
                ) : artworks.length === 0 ? (
                    <>
                        <p role="alert">No artworks found for your search.</p>
                        <img
                            className="noMatch"
                            title="No artworks found for your search criteria"
                            alt="No results"
                            src={nomatch}
                        />
                    </>
                ) : (
                    <section className="image-container">
                        {artworks.map((art, index) => (
                            <article
                                key={index}
                                className="item"
                                aria-label={`Artwork: ${art.title || "Untitled"}`}
                            >
                                <Link to={`/museums/chicago-institute-of-art/${art.id}`}>
                                    {renderImage(art, noImage)}
                                    <p
                                        className="itemTitle"
                                        title={art.title}
                                        aria-label={art.title || "Untitled"}
                                    >
                                        {art.title || "Untitled"}
                                    </p>
                                </Link>
                            </article>
                        ))}
                    </section>
                )}
                <nav className="pagination-buttons" aria-label="Pagination">
                    {currentPage > 1 && artworks.length > 0 && !error && (
                        <button
                            className="boxshadow"
                            style={{ height: "50px", width: "100px" }}
                            onClick={handlePrev}
                            aria-label="Previous page"
                        >
                            Prev
                        </button>
                    )}
                    {artworks.length > 0 && !error && (
                        <button
                            className="boxshadow"
                            style={{ height: "50px", width: "100px" }}
                            onClick={handleNext}
                            aria-label="Next page"
                        >
                            Next
                        </button>
                    )}
                </nav>
            </main>
        </Boxie>
    </>
    )
}

export default AllArtworks
