import { Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthProvider";
import RequireAuth from "./Auth/RequireAuth";
import RequireLoggedAut from "./Auth/RequireLoggedAut";

import RecipesModule from "./context/RecipesModule";
import Login from "./context/Login";

// import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

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
                {/* <Route path="/" element={<Navigate to="/home" />} /> */}
                <Route path="*" element={<NotFound />} />

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
