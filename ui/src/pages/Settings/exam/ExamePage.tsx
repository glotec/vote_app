import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import CreateExamModal from "./CreateExamModal";
import { getExams } from "../../../features/exam/exam-listSlice";

const ExamPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { exams, loading, error } = useSelector(
    (state: RootState) => state.examSlice
  );

  const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getExams()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (loading === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredClients = exams?.filter(
    (serv) =>
      serv.type.toLowerCase().includes(searchTerm.toLowerCase()) 
    //   serv.contact?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-2xl text-neutral font-bold">Liste des examens</h1>
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
            + Nouveau
          </button>
        </div>
      </div>
      <CreateExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Prix</th>
              {/* <th className="px-4 py-2 text-left">Date creation</th> */}
            </tr>
          </thead>
          <tbody>
            {filteredClients &&
              filteredClients.map((u, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.exam_id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.type}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.price}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExamPage;
