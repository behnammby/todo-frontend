import { Route, Routes } from "react-router";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";

import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
