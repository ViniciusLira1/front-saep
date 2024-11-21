import React from 'react';

const CadastrarTarefa = () => {
  return (
    <div>
      <h1>Cadastrar Tarefa</h1>
      <form>
        <div>
          <label>Descrição:</label>
          <input type="text" name="descricao" />
        </div>
        <div>
          <label>Setor:</label>
          <input type="text" name="setor" />
        </div>
        <div>
          <label>Prioridade:</label>
          <select name="prioridade">
            <option value="baixa">Baixa</option>
            <option value="media">Média</option>
            <option value="alta">Alta</option>
          </select>
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastrarTarefa;

