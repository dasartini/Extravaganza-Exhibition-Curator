import { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../firebaseConfig";
import { fetchSavedArtworks, removeUserArtwork, resetUserArtworks } from "../../firebaseApi";
import { useLoginContext } from "./LoginContext";

const SavedArtworksContext = createContext()

export function SavedArtworksProvider({ children }) {

  const {userID} = useLoginContext()
  const [savedArtworks, setSavedArtworks] = useState([])
 
 
  useEffect(() => {
    if (userID) {
      fetchSavedArtworks(userID).then((artworks) => {
        if (artworks) {
          setSavedArtworks(artworks)
        }
      })
    }
  }, [userID])
  

  const addArtwork = (artwork) => {
    if (!savedArtworks.some((a) => a.id === artwork.id && a.museum === artwork.museum)) {
      setSavedArtworks([...savedArtworks, artwork])
    }
  }

  const removeArtwork = async (index) => {
    const artworkToRemove = savedArtworks[index]
    
    try {
      if (artworkToRemove && userID) {
        await removeUserArtwork(userID, artworkToRemove.id)
      }
      const updated = savedArtworks.filter((_, i) => i !== index)
      setSavedArtworks(updated)
    } catch (error) {
      console.error("Error removing artwork:", error)
    }
  };

  const resetGallery = async () => {
    if (!userID) {
      console.error("No user logged in.")
      return
    }
  
    try {
      await resetUserArtworks(userID)
      setSavedArtworks([])
      console.log("Gallery has been reset.")
    } catch (error) {
      console.error("Error resetting gallery:", error)
    }
  };
  

  return (
    <SavedArtworksContext.Provider
      value={{
        savedArtworks,
        setSavedArtworks,
        fetchSavedArtworks,
        addArtwork,
        removeArtwork,
        resetGallery,
      }}
    >
      {children}
    </SavedArtworksContext.Provider>
  )
}

export const useSavedArtworks = () => useContext(SavedArtworksContext)
