import { createContext, useContext, useState } from "react";

const SavedArtworksContext = createContext()

export function SavedArtworksProvider({ children }) {
  const [savedArtworks, setSavedArtworks] = useState([])

  const addArtwork = (artwork) => {
    if (!savedArtworks.some((a) => a.title === artwork.title && a.museum === artwork.museum)) {
      setSavedArtworks([...savedArtworks, artwork])
    }
  }

  return (
    <SavedArtworksContext.Provider value={{ savedArtworks, addArtwork }}>
      {children}
    </SavedArtworksContext.Provider>
  )
}

export const useSavedArtworks = () => useContext(SavedArtworksContext);
