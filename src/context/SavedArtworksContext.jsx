import { createContext, useContext, useState, useEffect } from "react";

const SavedArtworksContext = createContext();

export function SavedArtworksProvider({ children }) {
  const [savedArtworks, setSavedArtworks] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("savedArtworks"));
    if (saved) setSavedArtworks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("savedArtworks", JSON.stringify(savedArtworks));
  }, [savedArtworks]);

  const addArtwork = (artwork) => {
    if (!savedArtworks.some((a) => a.title === artwork.title && a.museum === artwork.museum)) {
      setSavedArtworks([...savedArtworks, artwork]);
    }
  };

  const removeArtwork = (index) => {
    const updated = savedArtworks.filter((_, i) => i !== index);
    setSavedArtworks(updated);
  };

  const resetGallery = () => {
    setSavedArtworks([]);
  };

  return (
    <SavedArtworksContext.Provider
      value={{ savedArtworks, addArtwork, removeArtwork, resetGallery }}
    >
      {children}
    </SavedArtworksContext.Provider>
  );
}

export const useSavedArtworks = () => useContext(SavedArtworksContext);

