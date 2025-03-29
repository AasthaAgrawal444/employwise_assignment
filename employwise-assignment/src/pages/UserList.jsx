import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../api";
import UserCard from "./UserCard";
import { toast } from "react-toastify";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers(page);
        setUsers(data.data);
      } catch (error) {
        toast.error(error.message);
      }
    };
    loadUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {users.map((user) => (
        <UserCard key={user.id} user={user} onDelete={handleDelete} />
      ))}
      <button onClick={() => setPage(page + 1)} className="mt-4 p-2 bg-blue-500 text-white">Next Page</button>
    </div>
  );
};

export default UserList;
