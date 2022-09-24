import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./Auth/RequireAuth";
import RequireLoggedAut from "./Auth/RequireLoggedAut";

import Footer from "./components/Footer";
import RecipesModule from "./context/RecipesModule"

// import SignUp from "./pages/SignUp";
// import SignIn from "./pages/SignIn";
// import Home from "./pages/Home";
import Login from "./context/Login";

import "./App.scss";

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
                <Route element={<RequireLoggedAut />}>
                  <Route path="/api/*" element={<Login />} />
                </Route>
                <Route path="/*" element={<RecipesModule />} />

                {/* <Route path="/" element={<Home />} /> */}

                <Route element={<RequireAuth />}>
                  {/* <Route path="/*" element={<RecipesModule />} /> */}
                </Route>
              </Route>
            </Routes>
            <Footer />
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Suspense>
  );
};

export default App;
