import { useSavedArtworks } from "../context/SavedArtworksContext";
import SavedStyle from "../styles/SavedStyle";
import { useState } from "react";

function SavedArtworks() {
  const { savedArtworks, setSavedArtworks, removeArtwork, resetGallery } = useSavedArtworks()
  const [draggedItemIndex, setDraggedItemIndex] = useState(null)
  const [isResetting, setIsResetting] = useState(false)

  
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
    <div>
      <h1>My Saved Artworks</h1>
      <button onClick={handleResetGallery} className="reset">
        Reset Gallery
      </button>
      {savedArtworks.length === 0 ? (
        <p>No artworks saved yet!</p>
      ) : (
        <SavedStyle>
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
                  <button
                    className="erase"
                    onClick={() => removeArtwork(index)}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </SavedStyle>
      )}
    </div>
  )
}

export default SavedArtworks
