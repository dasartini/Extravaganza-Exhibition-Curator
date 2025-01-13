import { getDatabase, ref, set,get, update, push } from "firebase/database";
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

// export const writeArtwork = async (userID, standarizedArtwork)=>{

//   const db = getDatabase(app)
//   const userArtworkRef = ref(db, `registeredUsers/${userID}/artworks`)
//   try {
//     await push(userArtworkRef, standarizedArtwork);
//     console.log("artwork saved to database!")

//   }
//   catch(error){
//     console.error("Error saving artwork to database:", error)
//   }



// }

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
        // Get a reference to the user's saved artworks
        const userArtworksRef = ref(db, `registeredUsers/${userKey}/savedartworks`);

        // Push the artwork, letting Firebase generate the key
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
