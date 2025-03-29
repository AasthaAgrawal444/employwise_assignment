import { useState } from "react";
import { updateUser } from "../api";
import { useNavigate } from "react-router-dom";

const UpdateUserForm = ({ user }) => {
  const [formData, setFormData] = useState({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(user.id, formData);
      alert("User updated successfully!");
      navigate("/users"); // Redirect back to users list
    } catch (error) {
      alert("Failed to update user.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-md">
      <label>First Name:</label>
      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />

      <label>Last Name:</label>
      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />

      <label>Email:</label>
      <input type="email" name="email" value={formData.email} onChange={handleChange} required />

      <button type="submit" className="bg-blue-500 text-white px-4 py-2">Update</button>
    </form>
  );
};

export default UpdateUserForm;
