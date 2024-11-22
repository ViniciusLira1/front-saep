import React, { useState, useEffect } from "react";
import axios from "axios";
import ButtonComponent from "../components/button";

const CadastrarTarefa = () => {
  const [descricao, setDescricao] = useState('');
  const [setor, setSetor] = useState('');
  const [usuario, setUsuario] = useState(''); // Agora irá armazenar o ID do usuário
  const [usuarios, setUsuarios] = useState([]);
  const [prioridade, setPrioridade] = useState('baixa');
  const [status, setStatus] = useState('a_fazer'); // Adicionando status

  // Buscar usuários da API no carregamento
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/usuarios/");
        console.log(response.data);
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        alert("Erro ao carregar usuários. Por favor, tente novamente.");
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario) {
      alert("Por favor, selecione um usuário.");
      return;
    }

    // Criação da data de cadastro no formato ISO 8601
    const dataCadastro = new Date().toISOString();  // Formato: "2024-11-22T14:30:00Z"

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/tarefas/cadastrar/", {
        usuario,  // Enviando o ID do usuário
        descricao,
        setor,
        prioridade,
        status,
        data_cadastro: dataCadastro,  // Incluindo data_cadastro no payload
      });

      if (response.status === 201) {
        alert("Tarefa cadastrada com sucesso!");
        // Resetando os campos do formulário
        setDescricao('');
        setSetor('');
        setUsuario('');  // Resetando o usuário para vazio
        setPrioridade('baixa');
        setStatus('a_fazer'); // Resetando o status para "A Fazer"
      }
    } catch (error) {
      console.error("Erro ao cadastrar tarefa:", error);
      alert("Erro ao cadastrar tarefa. Por favor, tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-2xl font-bold text-center mb-6">Cadastrar Tarefa</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">Descrição</label>
            <input
              type="text"
              id="descricao"
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="setor" className="block text-sm font-medium text-gray-700">Setor</label>
            <input
              type="text"
              id="setor"
              name="setor"
              value={setor}
              onChange={(e) => setSetor(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuário</label>
            <select
              id="usuario"
              name="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="" disabled>Selecione um usuário</option>
              {usuarios.map((user) => (
                <option key={user.id} value={user.id}>  {/* Alterado para enviar o ID */}
                  {user.nome_usuario}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700">Prioridade</label>
            <select
              id="prioridade"
              name="prioridade"
              value={prioridade}
              onChange={(e) => setPrioridade(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
            <select
              id="status"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
              required
            >
              <option value="a_fazer">A Fazer</option>
              <option value="fazendo">Fazendo</option>
              <option value="pronto">Pronto</option>
            </select>
          </div>
          <ButtonComponent text="Cadastrar" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default CadastrarTarefa;
