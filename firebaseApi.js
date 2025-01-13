import { getDatabase, ref, set,get, update, push , query, orderByChild, equalTo} from "firebase/database";
import { app } from "./firebaseConfig";

export const writeUser = async (eMail, userName, uid) => {
  try {
    const db = getDatabase(app)
    const usersRef = ref(db, "registeredUsers")
    const newUserRef = push(usersRef)
    await set(newUserRef, {
      userUID:  uid,
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

        // Query the database to check for the existence of the artwork
        const existingArtworksSnapshot = await get(userArtworksRef);

        if (existingArtworksSnapshot.exists()) {
          const artworks = existingArtworksSnapshot.val();
          const alreadyExists = Object.values(artworks).some(
            artwork =>
              artwork.id === standardizedArtwork.id &&
              artwork.museum === standardizedArtwork.museum
          );

          if (alreadyExists) {
            console.log("Artwork already exists in the database!");
            return; // Exit the function if the artwork already exists
          }
        }

        // If the artwork does not exist, push it to the database
        await push(userArtworksRef, standardizedArtwork);
        console.log("Artwork successfully saved!");
      } else {
        console.error("User not found in registeredUsers!");
      }
    } else {
      console.error("No registered users found!");
    }
  } catch (error) {
    console.error("Error saving artwork to database:", error);
  }
};
