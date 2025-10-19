import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="relative w-full h-auto">
      <div className="relative w-full h-[80vh] overflow-hidden z-10">
        <div className="card bg-white text-neutral w-full mb-20">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">
              UNIVERSITE CATHOLIQUE LA SAPIENTIA
            </h2>
            <p className="text-lg">Bienvenue sur la plateforme d'inscription</p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Comment prendre une inscription ?</h2>
              <p>Marche à suivre pour s'inscrire</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">Apprendre</button>
              </div>
            </div>
          </div>
          <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Facultés organisées</h2>
              <p>Pour mieux faire un choix, voici nos sacultés</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">Lire plus</button>
              </div>
            </div>
          </div>
          <div className="card bg-neutral text-neutral-content w-96">
            <div className="card-body items-center text-center">
              <h2 className="card-title">Encore plus</h2>
              <p>Pour mieux faire un choix, voici nos sacultés</p>
              <div className="card-actions justify-end">
                <button className="btn btn-secondary">Lire plus</button>
              </div>
            </div>
          </div>
        </div>
        <div className="card bg-white text-neutral w-full mb-5">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-4xl">
              Un avenir meilleur vous attend
            </h2>
            <p className="text-lg">Nous offrons une formation de qualité, pour assurer un avenir dans le monde professionnel à nos étudiants.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
