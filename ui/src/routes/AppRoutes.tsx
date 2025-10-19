import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./AuthRoutes";
import { DashboardPage, MainDash, NotFoundPage, ProfilePage, SettingsTable, YearPage } from "../pages";
import ProtectedRoute from "./ProtectedRoutes";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />

      {/* Protected routes */}
      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainDash />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="profile" element={<ProfilePage />} />
      </Route>
      <Route path="receive" element={<Prods />} /> */}

      {/* Catch-All 404 Route */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}

      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="dashboard" element={<MainDash />}>
                <Route index element={<DashboardPage />} />
                <Route path="profile" element={<ProfilePage />} />
              </Route>
              <Route path="year" element={<YearPage />} />
              {/* <Route path="client" element={<ClientsTable />} /> */}
              <Route path="settings" element={<SettingsTable />} />
                {/* <Route path="profile" element={<ProfilePage />} />
              </Route> */}
              {/* Catch-All 404 Route (Protected) */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;

