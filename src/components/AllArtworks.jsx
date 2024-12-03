import { useState, useEffect } from "react"
import { usePageContext } from "../context/PageContext"
import { getArtworks } from "../api"
import Boxie from "../styles/Boxie"
import { Link } from "react-router"
import { useVisibleContext } from "../context/VisibleContext"


function AllArtworks() {
    const { visible, setVisible } = useVisibleContext()
    const { currentPage, setCurrentPage } = usePageContext()
    const [artworks, setArtworks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchArtworks = (pageNum) => {
        setLoading(true)
        getArtworks(pageNum)
            .then((data) => {
                setArtworks(data)
                setLoading(false)
            })
            .catch((err) => {
                setError(err.message)
                setLoading(false)
            })
    }

    useEffect(() => {
        fetchArtworks(currentPage)
        setVisible(false)
    }, [currentPage, visible])

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
                    {loading ? (<p>Loading...</p>) : error ? (<p>Error: {error}</p>) :
                        (
                            <div className="image-container">
                                {artworks.map((art, index) => (
                                    <div key={index} className="item">
                                        <img src={`https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg` || "placeholder.jpg"}
                                            alt={art.title || "Untitled"} className="itemImage" />
                                        <Link to={`/chicagoinstituteofart/${art.id}`}>
                                            <p className="itemTitle" title={art.title}>
                                                {art.title || "Untitled"} </p>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )}
                    <div className="pagination-buttons" style={{ marginTop: "20px" }}>
                        {currentPage > 1 && (
                            <button style={{ height: "50px", width: "100px", marginRight: "10px" }} onClick={handlePrev}> Prev </button>
                        )}
                        <button style={{ height: "50px", width: "100px" }} onClick={handleNext} > Next </button>
                    </div>
                </div>
            </Boxie>
        </>
    )
}

export default AllArtworks
