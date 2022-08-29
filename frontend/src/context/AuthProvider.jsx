import { createContext, useEffect, useMemo, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    const localAuth = localStorage.getItem("user");

    if (localAuth) {
      setAuth(JSON.parse(localAuth));
    }
  }, [setAuth]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(auth));
  }, [auth]);

  const contextValue = useMemo(
    () => ({
      auth,
      setAuth,
    }),
    [auth]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
