import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getArtworksById2 } from "../api";
import SingleArtworkStyle from '../styles/SingleArtworkStyle';
import DOMPurify from 'dompurify';
import watching from '../assets/images/watching.jpg';
import AddButton from "./AddButton";
import { useSavedArtworks } from "../context/SavedArtworksContext";
import noImage from "../assets/images/noImage2.jpg"
import Loader from "./Loader";
import GoBackButton from "./GoBack";
import { useVisibleContext } from "../context/VisibleContext";
import { usePaginationContext } from "../context/PaginationContext";
import { useLoginContext } from "../context/LoginContext";
import {writeArtwork} from "../../firebaseApi"
import Share2 from "./Share2";



function SingleArtwork2(){
const {savedArtworks,addArtwork} = useSavedArtworks()
const { visible, setVisible } = useVisibleContext()
const { num } = usePaginationContext()
const navigate = useNavigate()
const {artwork_id} = useParams()
const [artwork, setArtwork] = useState(null)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)
const [added, setAdded] =useState(false)
const {userID, user} =useLoginContext()



useEffect(()=>{

    getArtworksById2(artwork_id)
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
      id: artwork.id,
      title: artwork.title || "Untitled",
      artist: artwork.creators?.[0]?.description || "Unknown Artist",
      image: artwork.images?.web?.url || noImage,
      museum: "Cleveland",
    };
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
   <span onClick={() =>{
     navigate(`/museums/cleveland-art-museum`, { state: { num } })}}> <GoBackButton   /></span>
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
            {artwork.images?.web?.url ? (
              <img
                className="singleArtwork"
                src={artwork.images?.web?.url}
                alt={artwork.title || "Untitled"}
                title={artwork.tombstone || "Artwork details"}
              />
            ) : (
              <img
                className="singleArtwork"
                src={noImage}
                alt="No artwork available"
                title="No artwork image available"
              />
            )}
            <div className="specs">
              <h1 id="artwork-title">{artwork.title || "Untitled"}</h1>
              <ul>
                <li>By: {artwork.creators?.[0]?.description || "Unknown Artist"}</li>
                <li>Date: {artwork.creation_date || "Unknown Date"}</li>
                <li>
                  Place of origin: {artwork.culture?.[0] || "Unknown"}
                </li>
                <li>Medium: {artwork.technique || "Unknown medium"}</li>
                <li>Category: {artwork.department || "Unknown"}</li>
              </ul>
              <button
                className="addingButton"
                onClick={handleAdd}
                aria-label={`Add ${artwork.title || "Untitled"} to your gallery`}
              >
                <AddButton />
              </button>
              <p
                id="add-confirmation"
                aria-live="polite"
                hidden={!added}
                className="confirmation"

              >
                Artwork already added to your gallery!
              </p>
{   artwork.images?.web?.url    &&        <Share2 id ={artwork_id}/>}
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
              <h2>{artwork.creation_date || "Unknown Date"}.</h2>
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

export default SingleArtwork2