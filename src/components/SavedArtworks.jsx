import { useSavedArtworks } from "../context/SavedArtworksContext";
import SavedStyle from "../styles/SavedStyle";
import { useState } from "react";
import Slideshow from "./Slideshow";
import GoBackButton from "./GoBack";
import noArtworks from "../assets/images/noconnection.jpg"

function SavedArtworks() {
  const { savedArtworks, setSavedArtworks, removeArtwork, resetGallery } = useSavedArtworks()
  const [draggedItemIndex, setDraggedItemIndex] = useState(null)
  const [isResetting, setIsResetting] = useState(false)
  const [isSlideshowOpen, setIsSlideshowOpen] = useState(false)

  const handleResetGallery = () => {
    setIsResetting(true)
    setTimeout(() => {
      resetGallery()
      setIsResetting(false)
    }, 500)
  }

  const handleDragStart = (index) => {
    setDraggedItemIndex(index)
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return
    const reorderedArtworks = [...savedArtworks]
    const [draggedItem] = reorderedArtworks.splice(draggedItemIndex, 1)
    reorderedArtworks.splice(index, 0, draggedItem)

    setSavedArtworks(reorderedArtworks)
    setDraggedItemIndex(null)
  }

  return (
    <SavedStyle>
        <GoBackButton/>
      <div className="savedArtworksCont">
        <h1>My Saved Artworks</h1>
        {savedArtworks.length > 0 &&  <div  className="galleryButtonsCont">
          <button onClick={handleResetGallery} className="galleryButtons">
            Reset Gallery
          </button>
          <button disabled={savedArtworks.length === 0} onClick={() => setIsSlideshowOpen(true)} className="galleryButtons">
            Slide Show
          </button>
        </div>}
       
        {savedArtworks.length === 0 ? (
          <div className="noArtworksContainer"><p>No artworks saved yet!</p>
          <br></br>
          <p>Add artworks from different museums and arrange and check them out in a slideshow here.</p>
          <img style={{marginTop: "1rem", height:"20rem", borderRadius: "20px"}} src={noArtworks}/></div>
          
        ) : (
          <div className="listContainer">
            <ul>
              {savedArtworks.map((artwork, index) => (
                <li
                  key={index}
                  className={`savedList ${isResetting ? "fadeOut" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                >
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="draggingListImage"
                  />
                  <div>
                    <h2>{artwork.title}</h2>
                    <p>By: {artwork.artist}</p>
                    <p>From: {artwork.museum} Museum</p>
                  </div>
                  <button className="erase" onClick={() => removeArtwork(index)}>
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isSlideshowOpen && (
          <div className="modal">
            <div className="modal-overlay" onClick={() => setIsSlideshowOpen(false)}></div>
            <div className="modal-content">
          
              <Slideshow />
            </div>
          </div>
        )}
      </div>
    </SavedStyle>
  )
}

export default SavedArtworks
