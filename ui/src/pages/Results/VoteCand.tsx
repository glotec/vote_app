import React, { useEffect } from "react";
import type { AppDispatch, RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { getVotes, getVoteStats } from "../../features/vote/voteSlice";

const VoteCand: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { grouped, count } = useSelector((state: RootState) => state.voteSlice);

  useEffect(() => {
    dispatch(getVotes()); // Fetch categories when the component mounts
    dispatch(getVoteStats());
  }, [dispatch]);

  return (
    <div className="relative w-full h-auto">
      <div className="relative w-full h-[90vh] overflow-scroll z-10">
        <div className="card bg-white text-neutral w-full mb-10">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">STATISTICS DU VOTE</h2>
            <p className="text-lg">situation actuel de la vote par candidat</p>
          </div>
        </div>
        <div className="flex justify-center items-center h-[20vh] bg-gray-100">
          <div className="grid grid-cols-1 gap-4">
            <div className="card bg-neutral text-neutral-content w-96 items-center">
              <div className="card-body items-center text-center">
                <h2 className="card-title text-4xl">{count}</h2>
                <div className="card-actions justify-end">
                  <button className="btn btn-secondary">
                    Tous les votants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-neutral">
          {(() => {
            const maxCount = Math.max(...grouped.map((g) => g.count));

            return grouped.map((g) => (
              <div key={g.candident} className="card p-4 bg-white shadow">
                <h2 className="text-xl">Candidat {g.candident}</h2>
                <p className="text-lg font-bold">Votes: {g.count}</p>
                <p
                  className={`text-lg font-bold text-center ${
                    g.count === maxCount ? "text-red-500 text-2xl" : "text-gray-700"
                  }`}
                >
                  {((g.count * 100) / count).toFixed(2)}%
                </p>
              </div>
            ));
          })()}
        </div>

        {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-neutral">
          {grouped.map((g) => (
            <div key={g.candident} className="card p-4 bg-white shadow">
              <h2 className="text-xl">Candidat {g.candident}</h2>
              <p className="text-lg font-bold">Votes: {g.count}</p>
              <p className="text-lg font-bold text-center 2xl">{(g.count * 100)/count} %</p>
            </div>
          ))} 
        </div> */}
        <div className="card bg-white text-neutral w-full mb-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">Tous les votans</h2>
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

export default VoteCand;
