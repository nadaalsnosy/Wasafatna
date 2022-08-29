import { useContext, useDebugValue } from "react";
import AuthContext from "../context/AuthProvider";

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  useDebugValue(auth?.token ? "Logged In" : "Logged Out");
  let loggedValue = auth?.token ? "Logged In" : "Logged Out";
  console.log(loggedValue);
  return useContext(AuthContext);
};

export default useAuth;
