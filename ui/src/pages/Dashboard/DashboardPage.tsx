import React from "react";
import useAuth from "../../hooks/useAuth";

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold">
          Bienvenu <span className="text-bold">{user?.username}</span> à Votre
          Tableau de Bord
        </h1>
        <p className="mt-4 text-gray-700">
          Maintenez votre travail et vos programmes facilement ici.
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
