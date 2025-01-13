import { createContext, useContext, useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database";
import { app } from "../../firebaseConfig";
const SavedArtworksContext = createContext();

export function SavedArtworksProvider({ children }) {
  const [savedArtworks, setSavedArtworks] = useState([]);

  const fetchSavedArtworks = async (userUID) => {
    const db = getDatabase(app);
    const registeredUsersRef = ref(db, 'registeredUsers');
    try {
      // Fetch the registeredUsers data to find the "weird ID" for the user
      const snapshot = await get(registeredUsersRef);
      if (snapshot.exists()) {
        const usersData = snapshot.val();

        // Find the key (weird ID) for the user based on their UID
        const userKey = Object.keys(usersData).find(
          key => usersData[key].userUID === userUID
        );

        if (userKey) {
          const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`);
          const artworksSnapshot = await get(userArtworksRef);

          if (artworksSnapshot.exists()) {
            // Populate the savedArtworks state
            const artworks = Object.values(artworksSnapshot.val());
            setSavedArtworks(artworks);
          } else {
            console.log("No artworks found for the user.");
            setSavedArtworks([]); // Clear if no artworks are found
          }
        } else {
          console.error("User not found in registeredUsers!");
          setSavedArtworks([]);
        }
      } else {
        console.error("No registered users found!");
        setSavedArtworks([]);
      }
    } catch (error) {
      console.error("Error fetching artworks:", error);
    }
  };

  const addArtwork = (artwork) => {
    if (!savedArtworks.some((a) => a.id === artwork.id && a.museum === artwork.museum)) {
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
  );
}

export const useSavedArtworks = () => useContext(SavedArtworksContext);
