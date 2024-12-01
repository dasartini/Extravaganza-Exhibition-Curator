import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { getArtworksById } from "../api"
import SingleArtworkStyle from '../styles/SingleArtworkStyle'
import DOMPurify from 'dompurify'
import whatching from '../assets/images/watching.jpg'

function SingleArtwork(){

const {artwork_id} = useParams()
const [artwork, setArtwork] = useState(null)
const [error, setError] = useState(null)
const [loading, setLoading] = useState(true)

useEffect(()=>{

    getArtworksById(artwork_id)
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
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/400,/0/default.jpg`}
                alt={artwork.title || "Untitled"}
                title={artwork.thumbnail.alt_text}
            />
            <div className="specs">
            <h1>{artwork.title || "Untitled"}</h1>
            <ol>
            <p>By: {artwork.artist_title || "Unknown Artist"}</p>
            <p>Date: {artwork.date_display || "Unknown Date"}</p>
            <p>Place of origin: {artwork.place_of_origin || "unknown"}</p>
            <p>Medium: {artwork.medium_display}</p>
            <p>Category: {artwork.department_title}</p>
            
            </ol>
            </div>
        </div>

       {artwork.description ? <div className="artworkInfo"> 
<h1>{artwork.title || "Untitled"}

</h1>
<h2>{artwork.date_display || "Unknown Date"}. </h2>
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

export default SingleArtwork