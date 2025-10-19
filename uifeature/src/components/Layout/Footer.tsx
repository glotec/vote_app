import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white text-neutral p-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} UCS. All rights reserved | Ir Espoir M. - Glotec.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
