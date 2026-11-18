import { useState } from 'react';

export default function TabelaUsuarios({ usuarios, onEditar, onExcluir }) {
  const [busca, setBusca] = useState('');
  const [filtroCargo, setFiltroCargo] = useState('Todos');

  const listaFiltrada = usuarios.filter((u) => {
    const bateCargo = filtroCargo === 'Todos' || u.cargo === filtroCargo;
    const bateBusca =
      u.nome.toLowerCase().includes(busca.toLowerCase()) ||
      u.cpf.includes(busca);
    return bateCargo && bateBusca;
  });

  return (
    <section className="card">
      <h2>Consulta de Alunos e Professores (RF06)</h2>

      <div className="filtros">
        <input
          type="text"
          placeholder="Consultar por nome ou CPF..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select value={filtroCargo} onChange={(e) => setFiltroCargo(e.target.value)}>
          <option value="Todos">Todos os Cargos</option>
          <option value="Aluno">Apenas Alunos</option>
          <option value="Professor">Apenas Professores</option>
        </select>
      </div>

      
      {listaFiltrada.length === 0 ? (
        <p className="status-msg">Nenhum aluno ou professor encontrado.</p>
      ) : (
        <table className="tabela">
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF</th>
              <th>Cargo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaFiltrada.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>{usuario.cpf}</td>
                <td>
                  <span className={`badge ${usuario.cargo.toLowerCase()}`}>
                    {usuario.cargo}
                  </span>
                </td>
                <td className="acoes">
                  <button className="btn-editar" onClick={() => onEditar(usuario)}>
                    Editar
                  </button>
                  <button className="btn-excluir" onClick={() => onExcluir(usuario.id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}