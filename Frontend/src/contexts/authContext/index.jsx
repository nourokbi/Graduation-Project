/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { auth, database } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // check if user is logged in
    // if user is logged in, set user and isLoggedIn to true
    // else set user to null and isLoggedIn to false
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      if (user) {
        setUser({ ...user });
        setIsLoggedIn(true);

        // get user data from database
        try {
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("No user data available");
            setError("No user data available");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
          setError(error);
        }
      } else {
        setUser(null);
        setIsLoggedIn(false);
        setUserData(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const setErrorHandler = (message) => {
    setError(message);
  };

  const value = { user, isLoggedIn, loading, userData, error, setErrorHandler };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
