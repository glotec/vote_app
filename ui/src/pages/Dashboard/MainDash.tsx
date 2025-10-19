import { Outlet } from "react-router-dom";

const MainDash = () => {
  return (
    <div>
      
      {/* This is where the ProfilePage will render */}
      <Outlet />
    </div>
  );
};

export default MainDash;
