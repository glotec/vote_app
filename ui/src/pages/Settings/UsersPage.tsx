import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../app/store";
import { getUsers } from "../../features/auth/authSlice";

const UsersPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loader, error } = useSelector(
    (state: RootState) => state.authSlice
  );

  useEffect(() => {
    dispatch(getUsers()); // Fetch categories when the component mounts
  }, [dispatch]);

  if (loader === "loading") return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      {/* <CreateCategory /> */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2 text-left">Username</th>
              <th className="px-4 py-2 text-left">Full Name</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Connection</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((u, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.username}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.fullname}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.role?.role_name ?? "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.activated ? "✅ Active" : "❌ Inactive"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 border-b">
                    {u.is_connected ? "🟢 Online" : "⚪ Offline"}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPage;
