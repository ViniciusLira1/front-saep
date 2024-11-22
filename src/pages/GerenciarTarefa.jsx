import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const GerenciamentoDeTarefas = () => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [tarefas, setTarefas] = useState([]);
  const [opcoesStatus] = useState([
    { valor: "a_fazer", label: "A Fazer" },
    { valor: "fazendo", label: "Fazendo" },
    { valor: "pronto", label: "Pronto" },
  ]);

  // Buscar usuários
  const buscarUsuarios = async () => {
    try {
      const resposta = await axios.get("http://127.0.0.1:8000/api/usuarios/");
      setUsuarios(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar usuários:", erro);
    }
  };

  // Buscar tarefas
  const buscarTarefas = async () => {
    try {
      const resposta = await axios.get("http://127.0.0.1:8000/api/tarefas/");
      setTarefas(resposta.data);
    } catch (erro) {
      console.error("Erro ao buscar tarefas:", erro);
    }
  };

  // Executar ao carregar o componente
  useEffect(() => {
    buscarUsuarios();
    buscarTarefas();
  }, []);

  // Atualizar status da tarefa
  const atualizarStatus = async (idTarefa, novoStatus) => {
    const tarefaParaAtualizar = tarefas.find((tarefa) => tarefa.id === idTarefa);

    if (!tarefaParaAtualizar) {
      console.error("Tarefa não encontrada!");
      return;
    }

    try {
      const tarefaAtualizada = {
        ...tarefaParaAtualizar,
        status: novoStatus,
      };

      await axios.put(
        `http://127.0.0.1:8000/api/tarefas/alterar_status/${idTarefa}/`,
        tarefaAtualizada
      );

      setTarefas((tarefasPrevias) =>
        tarefasPrevias.map((tarefa) =>
          tarefa.id === idTarefa ? tarefaAtualizada : tarefa
        )
      );

      alert("Status da tarefa atualizado com sucesso!");
    } catch (erro) {
      console.error("Erro ao atualizar o status da tarefa:", erro);
      alert("Erro ao atualizar o status. Tente novamente.");
    }
  };

  // Excluir tarefa
  const excluirTarefa = async (idTarefa) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/tarefas/deletar/${idTarefa}/`);
      setTarefas((tarefasPrevias) =>
        tarefasPrevias.filter((tarefa) => tarefa.id !== idTarefa)
      );
      alert("Tarefa excluída com sucesso!");
    } catch (erro) {
      console.error("Erro ao excluir a tarefa:", erro);
      alert("Erro ao excluir a tarefa. Tente novamente.");
    }
  };

  // Filtra tarefas por status
  const tarefasPorStatus = (status) => {
    return tarefas.filter((tarefa) => tarefa.status === status);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho */}
      <div className="container mx-auto p-6">
        {/* Kanban Layout */}
        <div className="flex justify-between gap-6">
          {/* A Fazer */}
          <div className="w-1/3 bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">A Fazer</h2>
            {tarefasPorStatus("a_fazer").map((tarefa) => (
              <div key={tarefa.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="font-bold">{tarefa.descricao}</h3>
                <p><strong>Setor:</strong> {tarefa.setor}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Usuário:</strong> {tarefa.username}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => navigate(`/editar-tarefa/${tarefa.id}`)}
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
                <select
                  value={tarefa.status}
                  onChange={(e) => atualizarStatus(tarefa.id, e.target.value)}
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md"
                >
                  {opcoesStatus.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Fazendo */}
          <div className="w-1/3 bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Fazendo</h2>
            {tarefasPorStatus("fazendo").map((tarefa) => (
              <div key={tarefa.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="font-bold">{tarefa.descricao}</h3>
                <p><strong>Setor:</strong> {tarefa.setor}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Usuário:</strong> {tarefa.username}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => navigate(`/editar-tarefa/${tarefa.id}`)}
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
                <select
                  value={tarefa.status}
                  onChange={(e) => atualizarStatus(tarefa.id, e.target.value)}
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md"
                >
                  {opcoesStatus.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {/* Pronto */}
          <div className="w-1/3 bg-gray-50 p-4 rounded-md shadow-md">
            <h2 className="text-xl font-bold mb-4">Pronto</h2>
            {tarefasPorStatus("pronto").map((tarefa) => (
              <div key={tarefa.id} className="bg-white p-4 rounded-lg shadow-md mb-4">
                <h3 className="font-bold">{tarefa.descricao}</h3>
                <p><strong>Setor:</strong> {tarefa.setor}</p>
                <p><strong>Prioridade:</strong> {tarefa.prioridade}</p>
                <p><strong>Usuário:</strong> {tarefa.username}</p>
                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => navigate(`/editar-tarefa/${tarefa.id}`)}
                    className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => excluirTarefa(tarefa.id)}
                    className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
                <select
                  value={tarefa.status}
                  onChange={(e) => atualizarStatus(tarefa.id, e.target.value)}
                  className="mt-2 block w-full bg-gray-100 border border-gray-300 rounded-md"
                >
                  {opcoesStatus.map((opcao) => (
                    <option key={opcao.valor} value={opcao.valor}>
                      {opcao.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciamentoDeTarefas;
