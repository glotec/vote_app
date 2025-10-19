import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import type { AppDispatch, RootState } from "../../app/store";
import { getMe } from "../../features/users/userSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.userReducer.user);
  // const user = useSelector((state) => state.user.user);
  // const status = useSelector((state) => state.user.status);
  const error = useSelector((state: RootState) => state.userReducer.error);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // console.log(user)

  return (
    <div className="min-h-screen flex items-center justify-center">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 w-96 flex flex-col items-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="w-32 h-32 rounded-full object-cover mb-4"
          src={user?.username || "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"}
          alt="User Avatar"
        />
        <h1 className="text-xl font-semibold mb-2">
          {user?.fullname || "Profile utilisateur"}
        </h1>
        <p className="text-gray-600 text-center mb-4">
          {user?.username ||
            "Software engineer with a passion for building amazing applications."}
        </p>
        <motion.button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Modifier Profile
        </motion.button>
      </motion.div>
    </div>
  );
};
export default ProfilePage;
