import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebaseCongfig";
import { onAuthStateChanged } from "firebase/auth";

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unSubscribe();
  }, []);
  
  return (
    <LoginContext.Provider
      value={{
        user,
        setUser,
        userName,
        setUserName,
        email,
        setEmail,
        password,
        setPassword,
        loading,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;
