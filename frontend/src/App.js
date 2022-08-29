import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";

import Footer from "./components/Footer";

import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";


import './App.scss';

const App = () => {
  return (
    <Suspense
    fallback={
      <div>
        <Spinner animation="border" variant="success" />
      </div>
    }
  >
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route>
              {/* <Route element={<RequireLoggedAut />}> */}
                <Route path="/signUp" element={<SignUp />} />
                <Route path="/signIn" element={<SignIn />} />
                <Route path="/" element={<Home />} />
              {/* </Route> */}

              {/* <Route element={<RequireAuth />}>
                <Route path="/*" element={<MoviesModule />} />
              </Route> */}
            </Route>
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  </Suspense>
  );
}

export default App;
