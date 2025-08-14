import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/users");
      return res.data;
    },
  });

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/api/users/admin/${user._id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.name} is an Admin Now!`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((error) => {
            console.error(
              "Delete user error:",
              error.response ? error.response.data : error.message
            );
          });
      }
    });
  };

  // Admin always on top
  const sortedUsers = [...users].sort((a, b) => {
    if (a.role === "admin" && b.role !== "admin") return -1;
    if (a.role !== "admin" && b.role === "admin") return 1;
    return 0;
  });

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-evenly my-4 gap-2">
        <h2 className="text-xl md:text-3xl font-semibold">All Users</h2>
        <h2 className="text-xl md:text-3xl font-semibold">Total Users: {users.length}</h2>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block overflow-x-auto border rounded-lg shadow-md">
        <table className="table-auto min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-500">
                #
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-500">
                Name
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-500">
                Email
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-500">
                Role
              </th>
              <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-medium text-gray-500">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedUsers.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-100 transition duration-150"
              >
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-gray-700">
                  {index + 1}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-gray-900">
                  {user.name}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-gray-700">
                  {user.email}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-gray-700">
                  {user.role === "admin" ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="btn btn-sm bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1"
                      title="Make Admin"
                    >
                      <FaUsers />
                      <span className="hidden sm:inline">Make Admin</span>
                    </button>
                  )}
                </td>
                <td className="px-2 sm:px-4 py-2 sm:py-3 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-sm text-red-600 hover:text-red-800 flex items-center"
                    title="Delete User"
                  >
                    <FaTrashAlt />
                    <span className="ml-1 hidden sm:inline">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden w-4/5 space-y-4">
        {sortedUsers.map((user, index) => (
          <div
            key={user._id}
            className="border rounded-lg shadow-md p-4 bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">#{index + 1}</span>
              <div className="flex gap-2">
                {user.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user)}
                    className="btn btn-xs bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1"
                    title="Make Admin"
                  >
                    <FaUsers />
                  </button>
                )}
                <button
                  onClick={() => handleDeleteUser(user)}
                  className="btn btn-ghost btn-xs text-red-600 hover:text-red-800 flex items-center"
                  title="Delete User"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
            <p className="text-gray-900 font-semibold text-lg">{user.name}</p>
            <p className="text-gray-700 text-sm break-words">{user.email}</p>
            <p className="mt-2">
              {/* Role:{" "} */}
              {user.role === "admin" ? (
                <span className="inline-block px-2 py-1 text-xs font-semibold text-white bg-green-600 rounded">
                  Admin
                </span>
              ) : (
                <span className="text-gray-600 italic">User</span>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
