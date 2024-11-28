import { useState, useEffect } from "react"
import { getArtworks } from "../api"
import Boxie from "../styles/Boxie"

function AllArtworks() {
    const [artworks, setArtworks] = useState([])
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [num, setNum] = useState(1)


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
            });
    };

    useEffect(() => {
        fetchArtworks(num);
    }, [num]);


    const handleClick = () => {
        setNum((prevNum) => prevNum + 1)
    };
    const handlePrev = () => {
        if (num > 1) {
            setNum((prevNum) => prevNum - 1)
        }
    };

    return (
        <>
            <Boxie>
                <div className="latestNews">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <div className="image-container">
                            {artworks.map((art, index) => (
                                <div key={index} className="item">
                                    <img
                                        src={`https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg` || "placeholder.jpg"}
                                        alt={art.title || "Untitled"}
                                        className="itemImage"
                                    />
                                    <p className="itemTitle" title={art.title}>
                                        {art.title || "Untitled"}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="pagination-buttons" style={{ marginTop: "20px" }}>
                        {num > 1 && (
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
        </>
    )
}

export default AllArtworks;
