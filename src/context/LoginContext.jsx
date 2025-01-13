import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig"

const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const username = firebaseUser.email.split("@")[0]
        const id = firebaseUser.uid
        setUser(username)
        setIsLoggedIn(true)
        setUserID(id)
      } else {
        setUser(null)
        setIsLoggedIn(false)
        setUserID(null)
      }
    });

    return () => unsubscribe()
  }, []);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, userID, setUserID }}>
      {children}
    </LoginContext.Provider>
  );
}

export function useLoginContext() {
  return useContext(LoginContext)
}
