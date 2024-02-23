import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CreatePegawai from "./pages/create-pegawai";
import EditPegawai from "./pages/edit-pegawai";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Toastify from "./components/Toastify";

function App() {
  const { isDarkMode } = useSelector((state) => state.componentReducer);

  const darkTheme = createTheme({
    palette: {
      mode: isDarkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-pegawai" element={<CreatePegawai />} />
        <Route path="/edit-pegawai/:nama" element={<EditPegawai />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Toastify />
    </ThemeProvider>
  );
}

export default App;
