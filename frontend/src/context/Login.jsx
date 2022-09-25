import { createContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import IconsSlider from "../components/IconsSlider";

import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import NotFound from "../pages/NotFound";

export const LoginContext = createContext();

const Login = () => {
  const location = useLocation();

  return (
    <LoginContext.Provider value={""}>
      <IconsSlider />
      <Routes location={location} key={location.pathname}>
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LoginContext.Provider>
  );
};

export default Login;
