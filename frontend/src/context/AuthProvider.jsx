import { createContext, useEffect, useMemo, useState } from "react";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState();

  // const [auth, setAuth] = useState(() => {
  //   const localAuth = localStorage.getItem("user");
  //   return JSON.parse(localAuth) || {};
  // });

  useEffect(() => {
    const localAuth = localStorage.getItem("user");
    // console.log(localAuth);
    if (localAuth) {
      setAuth(JSON.parse(localAuth));
    }
  }, [setAuth]);

  // console.log(auth);
  useEffect(() => {
    if (auth) localStorage.setItem("user", JSON.stringify(auth));
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
