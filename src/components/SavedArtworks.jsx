import { useSavedArtworks } from "../context/SavedArtworksContext";

function SavedArtworks() {
  const { savedArtworks, removeArtwork, resetGallery } = useSavedArtworks();

  return (
    <div>
      <h1>My Saved Artworks</h1>
      {savedArtworks.length === 0 ? (
        <p>No artworks saved yet!</p>
      ) : (
        <div>
          <button onClick={resetGallery} style={{ marginBottom: "20px", padding: "10px" }}>
            Reset Gallery
          </button>
          <ul>
            {savedArtworks.map((artwork, index) => (
              <li key={index} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <img src={artwork.image} alt={artwork.title} style={{ width: "100px", marginRight: "10px" }} />
                <div>
                  <h2>{artwork.title}</h2>
                  <p>By: {artwork.artist}</p>
                  <p>From: {artwork.museum} Museum</p>
                </div>
                <button
                  onClick={() => removeArtwork(index)}
                  style={{
                    marginLeft: "10px",
                    background: "red",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    padding: "5px 10px",
                  }}
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SavedArtworks;
