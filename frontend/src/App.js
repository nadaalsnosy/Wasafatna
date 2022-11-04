import "./App.scss";

import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Spinner } from "react-bootstrap";

import RequireLoggedAut from "./Auth/RequireLoggedAut";

import { AuthProvider } from "./context/AuthProvider";
import { RecipesModule } from "./context/RecipesModule";

import Login from "./context/Login";
import PagesRoutes from "./context/PagesRoutes";

import Footer from "./components/Footer";

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
            <RecipesModule>
              <Routes>
                <Route element={<RequireLoggedAut />}>
                  <Route path="/api/*" element={<Login />} />
                </Route>
                <Route path="*" element={<PagesRoutes />} />
              </Routes>
              <Footer />
            </RecipesModule>
          </AuthProvider>
        </BrowserRouter>
      </div>
    </Suspense>
  );
};

export default App;
