import React from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-140px)] bg-red-100">
      <h1 className="text-4xl font-bold mb-4 bg-black text-red-500 p-8">
        404 - Page Not Found
      </h1>
      <p className="text-gray-700 mb-6">
        Oops! La page que vous cherchez n'existe pas !.
      </p>
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Revenir en arrière
      </button>
    </div>
  );
};

export default NotFoundPage;
