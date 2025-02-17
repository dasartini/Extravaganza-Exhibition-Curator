import { getDatabase, ref, set, get, remove, update, push, query, orderByChild, equalTo } from "firebase/database";
import { app } from "./firebaseConfig";

export const writeUser = async (eMail, userName, uid) => {
  try {
    const db = getDatabase(app)
    const usersRef = ref(db, "registeredUsers")
    const newUserRef = push(usersRef)
    await set(newUserRef, {
      userUID: uid,
      email: eMail,
      userName: userName,
    });
    console.log("User data saved to database")
  } catch (error) {
    console.error("Error saving user data:", error)
    throw error
  }
}

export const writeArtwork = async (userUID, standardizedArtwork) => {
  const db = getDatabase(app)
  const registeredUsersRef = ref(db, 'registeredUsers')

  try {
    const snapshot = await get(registeredUsersRef)

    if (snapshot.exists()) {
      const usersData = snapshot.val()
      const userKey = Object.keys(usersData).find(
        key => usersData[key].userUID === userUID
      )

      if (userKey) {
        const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`)

        const existingArtworksSnapshot = await get(userArtworksRef)

        if (existingArtworksSnapshot.exists()) {
          const artworks = existingArtworksSnapshot.val()
          const alreadyExists = Object.values(artworks).some(
            artwork =>
              artwork.id === standardizedArtwork.id &&
              artwork.museum === standardizedArtwork.museum
          )

          if (alreadyExists) {
            console.log("Artwork already exists in the database!")
            return
          }
        }

        await push(userArtworksRef, standardizedArtwork)
        console.log("Artwork successfully saved!")
      } else {
        console.error("User not found in registeredUsers!")
      }
    } else {
      console.error("No registered users found!")
    }
  } catch (error) {
    console.error("Error saving artwork to database:", error)
  }
}

export const fetchSavedArtworks = async (userUID) => {
  const db = getDatabase(app)
  const registeredUsersRef = ref(db, 'registeredUsers')
  try {
    const snapshot = await get(registeredUsersRef)
    if (snapshot.exists()) {
      const usersData = snapshot.val()
      const userKey = Object.keys(usersData).find(key => usersData[key].userUID === userUID)
      if (userKey) {
        const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`)
        const artworksSnapshot = await get(userArtworksRef)
        if (artworksSnapshot.exists()) {
          return Object.values(artworksSnapshot.val())
        }
      }
    }
  } catch (error) {
    console.error("Error fetching artworks:", error)
  }
  return []
}

export const resetUserArtworks = async (userUID) => {
  const db = getDatabase(app)
  const registeredUsersRef = ref(db, "registeredUsers")

  try {
    const snapshot = await get(registeredUsersRef);
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const userKey = Object.keys(usersData).find(
        (key) => usersData[key].userUID === userUID
      );

      if (userKey) {
        const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`)
        await remove(userArtworksRef)
        console.log("User's saved artworks have been reset.")
      } else {
        console.error("User not found.")
      }
    } else {
      console.error("No users found in the database.")
    }
  } catch (error) {
    console.error("Error resetting user's artworks:", error)
  }
}

export const removeUserArtwork = async (userUID, artworkID) => {
  const db = getDatabase(app)
  const registeredUsersRef = ref(db, "registeredUsers")

  try {
    const snapshot = await get(registeredUsersRef)
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const userKey = Object.keys(usersData).find(
        (key) => usersData[key].userUID === userUID
      )

      if (userKey) {
        const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`)
        const artworksSnapshot = await get(userArtworksRef)

        if (artworksSnapshot.exists()) {
          const artworksData = artworksSnapshot.val()

          const artworkKey = Object.keys(artworksData).find(
            (key) => artworksData[key].id === artworkID
          )

          if (artworkKey) {
            const artworkRef = ref(db, `registeredUsers/${userKey}/savedartworks/${artworkKey}`)
            await remove(artworkRef)
            console.log(`Artwork with id ${artworkID} removed successfully.`)
          } else {
            console.error("Artwork not found in the database.")
          }
        } else {
          console.error("No artworks found for the user.")
        }
      } else {
        console.error("User not found.")
      }
    }
  } catch (error) {
    console.error("Error removing artwork:", error)
  }
}