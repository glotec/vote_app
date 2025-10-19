import React from "react";
import { Route, Routes } from "react-router-dom";
import { Candidents, LoginPage, RegisterPage, ResultTable } from "../pages";
import VoteForm from "../pages/Auth/Vote";

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/inscription" element={<RegisterPage />} />
      <Route path="/vote" element={<VoteForm />} />
      <Route path="/cand" element={<Candidents />} />
      <Route path="/result" element={<ResultTable />} />
    </Routes>
  );
};

export default AuthRoutes;
