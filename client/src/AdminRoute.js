import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/Dashboard";
import Navbar from "./pages/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import Users from "./admin/Users";

const AdminRoute = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AdminRoute;
