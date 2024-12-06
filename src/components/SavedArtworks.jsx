import { useSavedArtworks } from "../context/SavedArtworksContext";

function SavedArtworks() {
  const { savedArtworks } = useSavedArtworks()

  return (
    <div>
      <h1>My Saved Artworks</h1>
      {savedArtworks.length === 0 ? (
        <p>No artworks saved yet!</p>
      ) : (
        <ul>
          {savedArtworks.map((artwork, index) => (
            <li key={index}>
              <img src={artwork.image} alt={artwork.title} style={{ width: "200px" }} />
              <h2>{artwork.title}</h2>
              <p>By: {artwork.artist}</p>
              <p>From: {artwork.museum} Museum</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SavedArtworks
