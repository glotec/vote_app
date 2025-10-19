import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../app/store";
import CreateClinics from "./CreateClinic";
import { useEffect, useState } from "react";
import { getClinics } from "../../../features/clinic/clinicSlice";

const ClinicPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { clinic, loading, error } = useSelector(
    (state: RootState) => state.clinicSlice
  );
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    
      useEffect(() => {
        dispatch(getClinics()); // Fetch categories when the component mounts
      }, [dispatch]);
    
      // if (loading === "loading") return <p>Loading...</p>;
      // if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <div className="flex w-full items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-neutral">Reception du malade</h1>
        <div className="flex gap-2">
          {/* <input
              type="text"
              placeholder="Rechercher..."
              className="px-3 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            /> */}
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => setIsModalOpen(true)}
          >
            + Nouvelle
          </button>
        </div>
      </div>
      <CreateClinics
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

      <div className="overflow-x-auto">
        <div className="card card-border bg-base-100 w-96">
          Clinique
          {clinic &&
            clinic.map((c, index) => (
              <div 
              key={index}
               className="card-body">
                <h2 className="card-title">{c.name}</h2>
                <p>
                  {c.address} - {c.phone}
                  {c.email}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">Buy Now</button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default ClinicPage;
