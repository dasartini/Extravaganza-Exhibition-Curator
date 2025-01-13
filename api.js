import { getDatabase, ref, set, push } from "firebase/database";
import { app } from "../../firebaseConfig";

export const writeUser = async (email, userName) => {
  try {
    const db = getDatabase(app)
    const usersRef = ref(db, "registeredUsers")
    const newUserRef = push(usersRef)
    await set(newUserRef, {
      email: email,
      userName: userName
    });
    console.log("User data saved to database")
  } catch (error) {
    console.error("Error saving user data:", error)
    throw error
  }
}
