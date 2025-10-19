import React from "react";
import { Route, Routes } from "react-router-dom";
import { Candident, LoginPage,  } from "../pages";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/vote" element={<Candident />} />
    </Routes>
  );
};

export default AuthRoutes;
