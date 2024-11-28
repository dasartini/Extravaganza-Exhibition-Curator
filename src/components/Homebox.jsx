import { useState, useEffect } from 'react';
import { getArtworks, } from "../api";
import Boxie from "../styles/Boxie";

function Homebox() {
    const [artworks, setArtworks] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArtworks()
            .then((data) => {
                setArtworks(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []); 

    return (
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
                                    src={`https://www.artic.edu/iiif/2/${art.image_id}/full/200,/0/default.jpg` || 'placeholder.jpg'} 
                                    alt={art.title || 'Untitled'} 
                                    className="itemImage" 
                                />
                                <p className="itemTitle" title={art.title}>{art.title || 'Untitled'}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Boxie>
    );
}

export default Homebox;
