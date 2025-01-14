import { getDatabase, ref, set, get, update, push, query, orderByChild, equalTo } from "firebase/database";
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
  const db = getDatabase(app);
  const registeredUsersRef = ref(db, 'registeredUsers');
  try {
    const snapshot = await get(registeredUsersRef);
    if (snapshot.exists()) {
      const usersData = snapshot.val();
      const userKey = Object.keys(usersData).find(key => usersData[key].userUID === userUID);
      if (userKey) {
        const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`);
        const artworksSnapshot = await get(userArtworksRef);
        if (artworksSnapshot.exists()) {
          return Object.values(artworksSnapshot.val());
        }
      }
    }
  } catch (error) {
    console.error("Error fetching artworks:", error);
  }
  return []; 
};


