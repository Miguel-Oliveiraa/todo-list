import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Autenticacao from "@/pages/Autenticacao";
import HomeScreen from "@/pages/home";
import PerfilScreen from "@/pages/perfil";

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Autenticacao />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/perfil" element={<PerfilScreen />} />
      </Routes>
    </Router>
  );
}
