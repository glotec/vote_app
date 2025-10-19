import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import { getReceptions } from "../../../features/reception/receptionSlice";

const ReceptionPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { receptions, loading, error } = useSelector(
    (state: RootState) => state.receptionSlice
  );

  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getReceptions()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (loading === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredReceptions = receptions?.filter(
    (rec) =>
      rec.motif.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec?.client?.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Reception du malade</h1>
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
            // onClick={() => setIsModalOpen(true)}
          >
            + Nouvelle
          </button>
        </div>
      </div>
      {/* <CreateFicheModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Date</th>
              <th className="px-4 py-2 text-left">Nom complet</th>
              <th className="px-4 py-2 text-left">Contact</th>
              <th className="px-4 py-2 text-left">Adresse</th>
              <th className="px-4 py-2 text-left">Motif</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReceptions &&
              filteredReceptions.map((u, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {/* {u.reception_id} */}
                    {/* {u.date.toLocaleDateString()} */}
                    {new Date(u.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.client?.fullname}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.client?.contact}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.client?.address}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.motif}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    Action
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReceptionPage;
