import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArtworksById } from "../api";
import SingleArtworkStyle from '../styles/SingleArtworkStyle';
import DOMPurify from 'dompurify';
import watching from '../assets/images/watching.jpg';
import AddButton from "./AddButton";
import { useSavedArtworks } from "../context/SavedArtworksContext";
import noImage from "../assets/images/noImage2.jpg"
import Loader from "./Loader";
import GoBackButton from "./GoBack";
import { useVisibleContext } from "../context/VisibleContext";
import { useLoginContext } from "../context/LoginContext";
import {writeArtwork} from "../../firebaseApi"


function SingleArtwork(){
    const {savedArtworks, addArtwork} = useSavedArtworks()
    const { visible, setVisible } = useVisibleContext()
    const {userID, user} =useLoginContext()


const {artwork_id} = useParams()
const [artwork, setArtwork] = useState(null)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)
const [added, setAdded] =useState(false)

useEffect(()=>{

    getArtworksById(artwork_id)
    .then((data)=>{
        setArtwork(data)
        setLoading(false)
        setVisible(true)

        window.scrollTo({ top: 0, behavior: "smooth" })

    })
    .catch((err)=>{
 setError(err.messge)
 setLoading(false)
})
},[artwork_id])

useEffect(() => {
  if (artwork) {
    checkArtworks()
  }
}, [artwork, savedArtworks])

const handleAdd = async () => {
  if(!user){
    alert("You must be logged in to save artworks.")
    return
  }
  
    const standardizedArtwork = {
      title: artwork.title ?
      artwork.title
      : "Untitled",
      artist: artwork.artist_title? artwork.artist_title : "Unknown Artist",
      image: artwork.image_id
        ? `https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`
        : noImage,
      museum: "Chicago",
    }
    addArtwork(standardizedArtwork)
    await writeArtwork(userID, standardizedArtwork)
  }
const checkArtworks = () => {
  const isAdded = savedArtworks.some((element) =>
     element.title === artwork.title)
  setAdded(isAdded)

}


return (<>
  <SingleArtworkStyle>
    <GoBackButton />
    <div className="singleArtworkCont">
      {loading ? (
        <>
          <Loader />

        </>
      ) : error ? (
        <p
          id="error-message"
          aria-live="assertive"
          style={{ color: "red" }}
        >
          Error loading artwork details: {error}.
        </p>
      ) : (
        <>
          <div className="frame">
            {artwork.image_id === null ? (
              <img
                className="singleArtwork"
                src={noImage}
                alt="No artwork available"
                title="No artwork image available"
              />
            ) : (
              <img
                className="singleArtwork"
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`}
                alt={artwork.title || "Untitled artwork"}
                title={artwork.thumbnail?.alt_text || "Artwork image"}
              />
            )}

            <div className="specs">
              <h1 id="artwork-title">{artwork.title || "Untitled"}</h1>
              <ul>
                <li>By: {artwork.artist_title || "Unknown Artist"}</li>
                <li>Date: {artwork.date_display || "Unknown Date"}</li>
                <li>
                  Place of origin: {artwork.place_of_origin || "Unknown"}
                </li>
                <li>Medium: {artwork.medium_display || "Unknown"}</li>
                <li>Category: {artwork.department_title || "Unknown"}</li>
              </ul>
              <button       className="addingButton"         aria-label={`Add ${artwork.title || "Untitled"} to your gallery`}
 onClick={handleAdd}>
                <AddButton aria-label="Add artwork to your gallery" />
              </button>
              <p
                id="add-confirmation"
                aria-live="polite"
                hidden={!added}
                className="confirmation"
              >
                Artwork already added to your gallery!
              </p>
            </div>
          </div>

          {artwork.description ? (
            <div
              className="artworkInfo"
              aria-labelledby="artwork-title artwork-description"
            >
              <h1 id="artwork-description">
                {artwork.title || "Untitled"}
              </h1>
              <h2>{artwork.date_display || "Unknown Date"}.</h2>
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(artwork.description),
                }}
              ></p>
            </div>
          ) : (
            <div className="artworkInfo">
              <h1>No description available for this artwork.</h1>
              <img
                className="watching"
                src={watching}
                alt="A person observing an artwork"
              />
            </div>
          )}
        </>
      )}
    </div>
  </SingleArtworkStyle>
</>


)

}

export default SingleArtwork