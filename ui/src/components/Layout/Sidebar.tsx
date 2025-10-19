import React, { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="relative">
        {/* Sidebar Toggle Button */}
        <button
          className="p-2 bg-blue-500 text-white fixed top-4 left-16 z-50 md:hidden"
          onClick={toggleSidebar}
        >
          {isOpen ? "Close" : "Menu"}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out md:translate-x-0`}
        >
          <div className="p-4 text-lg font-bold">Menu</div>
          <nav className="flex flex-col space-y-4 p-4">
            <Link to="/ucs/dashboard" className="hover:bg-gray-700 p-2 rounded">
              Dashboard
            </Link>
            <Link to="/ucs/students" className="hover:bg-gray-700 p-2 rounded">
              Etudiants
            </Link>
            <Link
              to="/ucs/year"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Annee
            </Link>
            <Link
              to="/ucs/address"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Adresse
            </Link>
            <Link
              to="/ucs/fac"
              className="hover:bg-gray-700 p-2 rounded"
            >
              Facultés
            </Link>
            <a
              onClick={logout}
              href="/"
              className={`block px-4 py-2 text-sm text-gray-700 hover:bg-red-400 rounded`}
            >
              Deconnexion
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
