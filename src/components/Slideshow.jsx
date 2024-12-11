import { useSavedArtworks } from "../context/SavedArtworksContext";
import SlideshowStyle from "../styles/SlideshowStyle";
import left from '../assets/images/left.svg'
import right from '../assets/images/right.svg'
import { useState } from "react";


function Slideshow(){
    const { savedArtworks } = useSavedArtworks()
    const [slide, setSlide] = useState(0)
    console.log(savedArtworks)
    const nextSlide = () =>{
        if(slide !== savedArtworks.length-1){setSlide(slide +1)}
        
    
      }
      const prevSlide = () =>{
        if (slide !== 0){setSlide(slide -1)}
        
    
      }

    return (
    
  
    <SlideshowStyle>
       
    <div className="carousel">
    <span className="arrows arrow-left" onClick={prevSlide}><img src={left}/></span>   
    {savedArtworks.map((artwork, index)=>{
        console.log(artwork, index)
        return <img src={artwork.image} alt={artwork.title} title={artwork.title} key={index} className={slide === index ? "slide" : "slide slide-hidden"}/>
    })}
        <span className="arrows arrow-right" onClick={nextSlide}><img src={right}/></span>   
<span className="indicators">
    {savedArtworks.map((_, index)=>{
        return <button className={slide === index ? "indicator" : "indicator-inactive"}key={index} onClick={()=> setSlide(index)}></button>
    })}
</span>
    </div>

    </SlideshowStyle>

    
    )
}
export default Slideshow