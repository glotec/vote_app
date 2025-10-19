import React, { useEffect } from "react";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
// import { getPics } from "../../features/pic/picSlice";
import { getVotes } from "../../features/vote/voteSlice";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
//   const { pics, loading, error } = useSelector(
//     (state: RootState) => state.picSlice
//   );

  const { count } = useSelector((state: RootState) => state.voteSlice);

  useEffect(() => {
    // dispatch(getPics()); // Fetch categories when the component mounts
    // setTimeout(()=> {
      dispatch(getVotes()); 
    // }, 3000)// Fetch categories when the component mounts
  }, [dispatch]);

  //   console.log(votes)

//   if (loading === "loading") return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

  return (
    <div className="relative w-full h-auto">
      <div className="relative w-full h-[90vh] overflow-scroll z-10">
        <div className="card bg-white text-neutral w-full mb-10">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">STATISTICS DU VOTE</h2>
            <p className="text-lg">situation actuel du vote</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-[20vh] bg-gray-100">
          <div className="grid grid-cols-1 gap-4">
            <div className="card bg-neutral text-neutral-content w-96 items-center">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-4xl"><p className="text-6xl">{count} </p>/ 342 élèves</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">
                    Tous les votants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="w-full flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
            {pics.length > 0 ? (
              pics.map((pic) => (
                <div
                  key={pic.pcan?.cid ?? pic.vid}
                  className="card w-72 bg-neutral text-neutral-content"
                >
                  <div className="card-body items-center text-center">
                    <img
                      src={`http://localhost:20255/uploads/${pic.pic}`}
                      alt="Uploaded"
                      className="w-full h-auto border"
                    />
                    <h2 className="card-title">
                      {pic.pcan?.name ?? "Candidat inconnu"}
                    </h2>
                    <div className="card-actions justify-end">
                      <button className="btn btn-secondary">
                        N°{pic.pcan?.cid ?? "?"}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">Aucune photo trouvée.</p>
            )}
          </div>
        </div> */}

        <div className="card bg-white text-neutral w-full mb-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">
              Tous les votans
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

export default Dashboard;
