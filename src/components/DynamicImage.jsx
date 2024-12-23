import { useState, useEffect } from "react";
import { getArtworksById } from "../api";
import noImage from "../assets/images/noImage2.jpg";
import Loader from "./Loader";

function DynamicImage({ singleArtworkId }) {
    const [dynamicImage, setDynamicImage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getArtworksById(singleArtworkId)
            .then((data) => {
                setDynamicImage(data.image_id)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching artwork by ID:", error)
                setLoading(false)
            })
    }, [singleArtworkId])

    if (loading) {
        return <Loader/>
    }

    return (
        <img
            src={
                dynamicImage
                    ? `https://www.artic.edu/iiif/2/${dynamicImage}/full/200,/0/default.jpg`
                    : noImage
            }
            alt={dynamicImage ? "Artwork" : "No artwork available"} 
            title={dynamicImage ? "Artwork Image" : "No image available"}
            className="itemImage"
        />
    )
}

export default DynamicImage
