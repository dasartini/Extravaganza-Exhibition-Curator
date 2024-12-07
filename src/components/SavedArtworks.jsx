import { useSavedArtworks } from "../context/SavedArtworksContext";
import SavedStyle from "../styles/SavedStyle"

function SavedArtworks() {
  const { savedArtworks, removeArtwork, resetGallery } = useSavedArtworks();

  return (
    <div>
      <h1>My Saved Artworks</h1>
      <button onClick={resetGallery} className="reset">
            Reset Gallery
          </button>
      {savedArtworks.length === 0 ? (
        <p>No artworks saved yet!</p>
      ) : (
        <SavedStyle>
        <div className="listContainer">
         
          <ul>
            {savedArtworks.map((artwork, index) => (
              <li key={index} className="savedList">
                <img src={artwork.image} alt={artwork.title} className="draggingListImage" />
                <div>
                  <h2>{artwork.title}</h2>
                  <p>By: {artwork.artist}</p>
                  <p>From: {artwork.museum} Museum</p>
                </div>
                <button className="erase"
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
  );
}

export default SavedArtworks;
