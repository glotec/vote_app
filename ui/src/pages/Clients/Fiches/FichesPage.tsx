import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { getClients } from "../../../features/client/clientSlice";
import CreateFicheModal from "./CreateFicheModal";
import type { Client } from "../../../features/client/types";
import CreateReception from "../Reception/CreateReception";

const FichesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clients, loading, error } = useSelector(
    (state: RootState) => state.clientsSlice
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Client | null>(null);
  const [isModalOpenMark, setIsModalOpenMark] = useState(false);

  useEffect(() => {
    dispatch(getClients()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (loading === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredClients = clients?.filter(
    (client) =>
      client.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Fiche d'enregistrement</h1>
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
      <CreateFicheModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <CreateReception
        isOpen={isModalOpenMark}
        onClose={() => setIsModalOpenMark(false)}
        clients={selectedProduct}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nom complet</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Adresse</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredClients &&
              filteredClients.map((u, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.client_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.fullname}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.contact}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.address}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md"
                      onClick={() => {
                        setSelectedProduct({
                          client_id: u.client_id,
                          fullname: u.fullname,
                        }); 
                        setIsModalOpenMark(true);
                      }}
                    >
                      + Reception
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FichesPage;
