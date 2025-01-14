import { useSavedArtworks } from "../context/SavedArtworksContext";
import SavedStyle from "../styles/SavedStyle";
import { useState, useEffect } from "react";
import Slideshow from "./Slideshow";
import GoBackButton from "./GoBack";
import noArtworks from "../assets/images/noconnection.jpg";
import { useSlideShowContext } from "../context/SlideShowContext";
import { useLoginContext } from "../context/LoginContext"; 

function SavedArtworks() {
  const { setSavedArtworks, savedArtworks, fetchSavedArtworks, removeArtwork, resetGallery } = useSavedArtworks()
  const [draggedItemIndex, setDraggedItemIndex] = useState(null)
  const [isResetting, setIsResetting] = useState(false)
  const { isSlideShowOpen, setIsSlideShowOpen } = useSlideShowContext()
  const { user, userID } = useLoginContext()
  useEffect(() => {
    if (userID) {
      fetchSavedArtworks(userID);
    }
  }, [user, fetchSavedArtworks]);

  const handleResetGallery = () => {
    setIsResetting(true);
    setTimeout(() => {
      resetGallery();
      setIsResetting(false);
    }, 500);
  };

  const handleDragStart = (index) => {
    setDraggedItemIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedItemIndex === null || draggedItemIndex === index) return;
    const reorderedArtworks = [...savedArtworks];
    const [draggedItem] = reorderedArtworks.splice(draggedItemIndex, 1);
    reorderedArtworks.splice(index, 0, draggedItem);
    setSavedArtworks(reorderedArtworks);
    setDraggedItemIndex(null);
  };

  return (
    <SavedStyle>
      <GoBackButton />
      <div className="savedArtworksCont">
        <h1 id="saved-artworks-heading">My Saved Artworks</h1>
        {savedArtworks.length > 0 && (
          <div className="galleryButtonsCont">
            <button
              onClick={handleResetGallery}
              className="galleryButtons"
              aria-label="Reset gallery to remove all saved artworks"
            >
              Reset Gallery
            </button>
            <button
              disabled={savedArtworks.length === 0}
              onClick={() => setIsSlideShowOpen(true)}
              className="galleryButtons"
              aria-label="Open slideshow of saved artworks"
            >
              Slide Show
            </button>
          </div>
        )}

        {savedArtworks.length === 0 ? (
          <div className="noArtworksContainer">
            <p aria-live="polite">No artworks saved yet!</p>
            <br />
            <p>Add artworks from different museums and arrange and check them out in a slideshow here.</p>
            <img
              style={{ marginTop: "1rem", height: "20rem", borderRadius: "20px" }}
              src={noArtworks}
              alt="No artworks saved illustration"
            />
          </div>
        ) : (
          <div className="listContainer" role="list" aria-labelledby="saved-artworks-heading">
            <ul>
              {savedArtworks.map((artwork, index) => (
                <li
                  key={index}
                  className={`savedList ${isResetting ? "fadeOut" : ""}`}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  role="listitem"
                  aria-label={`Artwork: ${artwork.title}, by ${artwork.artist}`}
                >
                  <img
                    src={artwork.image}
                    alt={`Artwork: ${artwork.title}`}
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
                    aria-label={`Remove artwork: ${artwork.title}`}
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isSlideShowOpen && (
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="slideshow-heading"
          >
            <div
              className="modal-overlay"
              onClick={() => setIsSlideShowOpen(false)}
              aria-label="Close slideshow"
            >
              <div className="closingCont">
                <button onClick={() => setIsSlideShowOpen(false)} className="go go-closing">
                  Close
                </button>
              </div>
            </div>
            <div className="modal-content">
              <Slideshow />
            </div>
          </div>
        )}
      </div>
    </SavedStyle>
  );
}

export default SavedArtworks;
