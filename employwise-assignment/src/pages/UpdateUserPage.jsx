import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUsers } from "../api";
import UpdateUserForm from "./updateUserForm";
const UpdateUserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchUsers();
        const foundUser = data.data.find(user => user.id === parseInt(id));
        setUser(foundUser);
      } catch (error) {
        alert("Error loading user.");
      }
    };
    loadUser();
  }, [id]);

  return (
    <div>
      <h1>Update User</h1>
      {user ? <UpdateUserForm user={user} /> : <p>Loading...</p>}
    </div>
  );
};

export default UpdateUserPage;
