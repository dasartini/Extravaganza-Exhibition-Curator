import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getArtworksById2 } from "../api";
import SingleArtworkStyle from '../styles/SingleArtworkStyle';
import DOMPurify from 'dompurify';
import whatching from '../assets/images/watching.jpg';
import AddButton from "./AddButton";

function SingleArtwork2(){

const {artwork_id} = useParams()
const [artwork, setArtwork] = useState(null)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(()=>{

    getArtworksById2(artwork_id)
    .then((data)=>{
        setArtwork(data)
        console.log(artwork)
        setLoading(false)
    })
    .catch((err)=>{
        console.log("was an error")
 setError(err.messge)
 setLoading(false)
})
},[artwork_id])


return (<>

<SingleArtworkStyle>

<div className='singleArtworkCont'>
    {loading ?   <div className="frame">
        <p>LOADING PLEASE</p></div> : 
        <>
        <div className="frame">
            <img className="singleArtwork"
                src={artwork.images?.web?.url }
                alt={artwork.title || "Untitled"}
                title={artwork.tombstone}
            />
            <div className="specs">
            <h1>{artwork.title || "Untitled"}</h1>
            <ol>
            <p>By: {artwork.creators?.[0]?.description?? "Unknown Artist"}</p>
            <p>Date: {artwork.creation_date??  "Unknown Date"}</p>
            <p>Place of origin: {artwork.culture?.[0]?? "Unknown"}</p>
            <p>Medium: {artwork.technique?? "Unknown medium"}</p>
            <p>Category: {artwork.department?? "Unknown"}</p>
            
            </ol>
            <AddButton/>
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