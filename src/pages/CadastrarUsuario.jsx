import React, { useState } from "react";
import axios from "axios";
import ButtonComponent from "../components/button";

const CadastrarUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/usuarios/cadastrar/", {
        nome_usuario: nome, // Alterar o campo para 'nome_usuario'
        email,
      });
  
      if (response.status === 201) {
        alert(`Usuário ${nome} cadastrado com sucesso!`);
        setNome('');
        setEmail('');
      }
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Usuário</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <ButtonComponent text="Cadastrar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CadastrarUsuario;
