import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import { Link } from "react-router-dom";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        const data = await fetchUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages); 
      } catch (error) {
        alert("Error loading users.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
        alert("User deleted successfully!");
      } catch (error) {
        alert("Error deleting user.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">User List</h1>

        {loading ? (
          <p className="text-gray-600 text-lg text-center">Loading...</p>
        ) : (
          <div className="space-y-6">
            {users.map(user => (
              <div key={user.id} className="flex items-center justify-between p-4 border-b">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <img src={user.avatar} alt={user.first_name} className="w-16 h-16 rounded-full border" />
                  <div>
                    <p className="text-lg font-semibold text-gray-700">{user.first_name} {user.last_name}</p>
                    <p className="text-gray-500">{user.email}</p>
                  </div>
                </div>
                
                {/* Edit & Delete Buttons */}
                <div className="flex space-x-2">
                  <Link 
                    to={`/update/${user.id}`} 
                    className="px-4 py-2 bg-blue-600 text-red rounded-lg hover:bg-blue-700 transition"
                  >
                    ✏ Edit
                  </Link>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    className="px-4 py-2 bg-red-500 text-red rounded-lg hover:bg-red-700 transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-4 mt-6">
              <button 
                onClick={() => setPage(page - 1)} 
                disabled={page === 1}
                className={`px-4 py-2 rounded-lg ${page === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 transition"}`}
              >
                Previous
              </button>
              <span className="text-lg font-semibold text-gray-700">{page} / {totalPages}</span>
              <button 
                onClick={() => setPage(page + 1)} 
                disabled={page === totalPages}
                className={`px-4 py-2 rounded-lg ${page === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-green-500 text-white hover:bg-green-600 transition"}`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersPage;
