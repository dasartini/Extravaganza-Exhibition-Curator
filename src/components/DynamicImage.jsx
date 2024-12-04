import { useState, useEffect } from "react";
import { getArtworksById } from "../api";

function DynamicImage({ singleArtworkId }) {
    const [dynamicImage, setDyamicImage] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        getArtworksById(singleArtworkId)
            .then((data) => {
                setDyamicImage(data.image_id)
                setLoading(false) 
            })
            .catch((error) => {
                console.error('Error fetching artwork by ID:', error)
                setLoading(false)
            })
    }, [singleArtworkId])

    if (loading) {
        return <p>Loading image...</p>;
    }

 
    return (
        <img
            src={`https://www.artic.edu/iiif/2/${dynamicImage}/full/200,/0/default.jpg`}
            alt="Artwork"
            className="itemImage"
        />
    );
}

export default DynamicImage