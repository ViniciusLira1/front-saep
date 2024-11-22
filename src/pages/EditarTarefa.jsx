import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditarTarefa = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState([]);
  const [formData, setFormData] = useState({
    usuario: "",
    descricao: "",
    setor: "",
    prioridade: "baixa",
    status: "a_fazer",
  });

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/usuarios/")
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Erro ao carregar usuários:", error));
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tarefas/alterar/${id}/`);
        const taskData = response.data;
        setTask(taskData);
        setFormData({
          usuario: taskData.usuario || "",
          descricao: taskData.descricao || "",
          setor: taskData.setor || "",
          prioridade: taskData.prioridade || "baixa",
          status: taskData.status || "a_fazer",
        });
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar a tarefa:", error);
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/tarefas/alterar/${id}/`, formData)
      .then(() => {
        alert("Tarefa atualizada com sucesso!");
        navigate("/gerenciar-tarefas");
      })
      .catch((error) => {
        console.error("Erro ao atualizar a tarefa:", error);
        alert("Erro ao atualizar a tarefa. Tente novamente.");
      });
  };

  if (loading) {
    return <div className="text-center text-lg py-10">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Cabeçalho */}
     

      {/* Formulário */}
      <div className="container mx-auto py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">Editar Tarefa</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Usuário</label>
            <select
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded-md"
            >
              {usuarios.map((usuario) => (
                <option key={usuario.id} value={usuario.id}>
                  {usuario.nome_usuario}
                </option>
              ))}
            </select>
            {console.log(usuarios)}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Descrição da Tarefa
            </label>
            <textarea
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Setor</label>
            <input
              type="text"
              name="setor"
              value={formData.setor}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Prioridade</label>
            <select
              name="prioridade"
              value={formData.prioridade}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded-md"
            >
              <option value="baixa">Baixa</option>
              <option value="media">Média</option>
              <option value="alta">Alta</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
              className="block w-full p-2 border rounded-md"
            >
              <option value="a_fazer">A Fazer</option>
              <option value="fazendo">Fazendo</option>
              <option value="pronto">Pronto</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditarTarefa;
