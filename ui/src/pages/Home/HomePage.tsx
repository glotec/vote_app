import React, { useEffect } from "react";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getPics } from "../../features/pic/picSlice";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { pics, loading, error } = useSelector(
    (state: RootState) => state.picSlice
  );

  useEffect(() => {
    dispatch(getPics()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (loading === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full h-auto">
      <div className="relative w-full h-[80vh] overflow-scroll z-10">
        <div className="card bg-white text-neutral w-full mb-20">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">GROUPE SCOLAIRE JOANA</h2>
            <p className="text-lg">Bienvenue sur la plateforme de vote</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {pics.map((pic, index) => (
            <div
              key={index}
              className="card bg-neutral text-neutral-content w-96"
            >
              <div className="card-body items-center text-center">
                <img
                  src={`http://localhost:20255/uploads/${pic.pic}`}// or use full URL from API
                  alt="Uploaded"
                  style={{
                    width: "300px",
                    height: "auto",
                    border: "1px solid #ccc",
                  }}
                />
                <h2 className="card-title">{pic.pcan.name}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">
                    N°{pic.pcan.cid}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card bg-white text-neutral w-full mb-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">
              Un avenir meilleur vous attend
            </h2>
            <p className="text-lg">
              Nous formons par la pratique et mettons en application les
              enseignements{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
