import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreatePegawai from "./pages/create-pegawai";
import EditPegawai from "./pages/edit-pegawai";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create-pegawai" element={<CreatePegawai />} />
      <Route path="/edit-pegawai/:nama" element={<EditPegawai />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}

export default App;
