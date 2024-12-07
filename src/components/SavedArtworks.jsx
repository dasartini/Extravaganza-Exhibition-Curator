import { useSavedArtworks } from "../context/SavedArtworksContext";
import SavedStyle from "../styles/SavedStyle";
import { useState } from "react";

function SavedArtworks() {
  const { savedArtworks, setSavedArtworks, removeArtwork, resetGallery } = useSavedArtworks()
  const [draggedItemIndex, setDraggedItemIndex] = useState(null)
  const [isResetting, setIsResetting] = useState(false); // Track if reset is in progress
  const handleResetGallery = () => {
    setIsResetting(true); // Start the fade-out animation

    // Wait for the animation to finish (500ms)
    setTimeout(() => {
      resetGallery(); // Call the context function to reset the artworks
      setIsResetting(false); // Reset the reset flag
    }, 500); // Match the duration of the fade-out animation
  };

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
