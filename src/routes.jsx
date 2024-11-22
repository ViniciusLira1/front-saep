import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CadastrarUsuario from "./pages/CadastrarUsuario";
import CadastrarTarefa from "./pages/CadastrarTarefa";
import GerenciarTarefa from "./pages/GerenciarTarefa";
import NavbarComponent from "./components/navbar";
import EditarTarefa from "./pages/EditarTarefa";

const AppRoutes = () => {
  return (
    <Router>
      <NavbarComponent />
      <Routes>
        <Route path="/cadastrar-usuario" element={<CadastrarUsuario />} />
        <Route path="/cadastrar-tarefa" element={<CadastrarTarefa />} />
        <Route path="/gerenciar-tarefa" element={<GerenciarTarefa />} />
        <Route path="/editar-tarefa/:id" element={<EditarTarefa />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
