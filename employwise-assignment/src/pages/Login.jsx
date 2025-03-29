import { useState } from "react";
import { loginUser } from "../api";
import { saveToken } from "../utils/storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      saveToken(data.token);
      toast.success("Login successful!");
      navigate("/users");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 w-full mt-2" placeholder="Password" required />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full mt-2">Login</button>
    </form>
  );
};

export default LoginForm;
