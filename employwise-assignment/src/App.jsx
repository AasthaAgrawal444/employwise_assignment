import { Routes, Router, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import UserList from "./pages/UserList";
import UpdateUserPage from "./pages/UpdateUserPage";


function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/users" element={<UserList />} />
      <Route path="/update/:id" element={<UpdateUserPage />} />
      {/* <Route path="*" element={<Navigate to="/" />} /> */}
    </Routes>
  )
}

export default App
