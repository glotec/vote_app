import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { getAnnees } from "../../features/year/yearSlice";
import CreateYear from "./CreateYear";

const YearPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { annees, loading, error } = useSelector(
    (state: RootState) => state.yearSlice
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getAnnees()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (loading === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredAnnees = annees?.filter(
    (ann) =>
      ann.annee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ann.code?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Années Académiques</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-3 py-2 border rounded-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            + Nouvelle
          </button>
        </div>
      </div>
      <CreateYear
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      {/* <CreateReception
        isOpen={isModalOpenMark}
        onClose={() => setIsModalOpenMark(false)}
        clients={selectedProduct}
      /> */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Années</th>
              <th className="px-4 py-2 text-left">Debut</th>
              <th className="px-4 py-2 text-left">Fin</th>
              <th className="px-4 py-2 text-left">Fin Inscription</th>
              <th className="px-4 py-2 text-left">Etat</th>
            </tr>
          </thead>
          <tbody>
            {filteredAnnees &&
              filteredAnnees.map((u, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.code}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.annee}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.debut}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.fin}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.fin_inscription}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.status ? "En cours" : "Fini"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default YearPage;
