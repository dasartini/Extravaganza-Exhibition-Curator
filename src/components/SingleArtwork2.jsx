import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArtworksById2 } from "../api";
import SingleArtworkStyle from '../styles/SingleArtworkStyle';
import DOMPurify from 'dompurify';
import whatching from '../assets/images/watching.jpg';
import AddButton from "./AddButton";
import { useSavedArtworks } from "../context/SavedArtworksContext";
import noImage from "../assets/images/noImage2.jpg"
import Loader from "./Loader";
import GoBackButton from "./GoBack";


function SingleArtwork2(){
const {savedArtworks,addArtwork} = useSavedArtworks()
const {artwork_id} = useParams()
const [artwork, setArtwork] = useState(null)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)
const [added, setAdded] =useState(false)


useEffect(()=>{

    getArtworksById2(artwork_id)
    .then((data)=>{
        setArtwork(data)
        setLoading(false)
        window.scrollTo({ top: 0, behavior: "smooth" })

    })
    .catch((err)=>{
        console.log("was an error")
 setError(err.messge)
 setLoading(false)
})
},[artwork_id])

useEffect(() => {
    if (artwork) {
      checkArtworks()
    }
  }, [artwork, savedArtworks])

const handleAdd = () => {
    const standardizedArtwork = {
      title: artwork.title || "Untitled",
      artist: artwork.creators?.[0]?.description || "Unknown Artist",
      image: artwork.images?.web?.url || noImage,
      museum: "Cleveland",
    };
    addArtwork(standardizedArtwork)
  }

  const checkArtworks = () => {
    const isAdded = savedArtworks.some((element) =>
       element.title === artwork.title)
    setAdded(isAdded)
  }

return (<>

<SingleArtworkStyle>
<GoBackButton/>
<div className='singleArtworkCont'>
    {loading ?   <Loader/> : 
        <>
        <div className="frame">
            {artwork.images?.web?.url ? (
                 <img className="singleArtwork"
                 src={artwork.images?.web?.url}
                 alt={artwork.title || "Untitled"}
                 title={artwork.tombstone}
             />
            ):
            (
                <img
                className="singleArtwork"
                src={noImage} 
                alt="No artwork available"
                title="No artwork image available"
              />
            )}
            <div className="specs">
            <h1>{artwork.title || "Untitled"}</h1>
            <ol>
            <p>By: {artwork.creators?.[0]?.description?? "Unknown Artist"}</p>
            <p>Date: {artwork.creation_date??  "Unknown Date"}</p>
            <p>Place of origin: {artwork.culture?.[0]?? "Unknown"}</p>
            <p>Medium: {artwork.technique?? "Unknown medium"}</p>
            <p>Category: {artwork.department?? "Unknown"}</p>
            
            </ol>
            
            <span onClick={handleAdd}><AddButton/></span>
            <p hidden={!added} style={{margin: "20px"}}>Artwork already added into your gallery!</p>

            </div>
        </div>

       {artwork.description ? <div className="artworkInfo"> 
<h1>{artwork.title || "Untitled"}

</h1>
<h2>{artwork.creation_date|| "Unknown Date"}. </h2>
<p
dangerouslySetInnerHTML={{  __html: DOMPurify.sanitize(artwork.description), }}
></p>
</div>:<div className="artworkInfo">
<h1>This artwork has no description. What do you think about it?</h1> 
<img className="watching"src={whatching}/></div>} 
        
        </>
        }

        </div>
        </SingleArtworkStyle>
    </>


)

}

export default SingleArtwork2