import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import GoFullPage from "./components/GoFullPage";
import TaxCalc from "./pages/services/TaxCalc";
import TaxFile from "./pages/services/taxFiling/TaxFile";
import Register from "./pages/Register";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GoFullPage>
          <Navbar />
        </GoFullPage>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/taxcalc"
            element={
              <ProtectedRoutes>
                <TaxCalc />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/taxfile"
            element={
              <ProtectedRoutes>
                <TaxFile />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
