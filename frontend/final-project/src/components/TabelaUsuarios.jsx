function LinhaUsuario({ usuario, onEditar, onExcluir }) {
  if (!usuario) return null

  return (
    <tr>
      <td>{usuario.id}</td>
      <td>{usuario.nome}</td>
      <td>{usuario.email}</td>
      <td>{usuario.cpf || '---'}</td>
      <td>
        <span className={`badge badge-${usuario.cargo}`}>{usuario.cargo}</span>
      </td>
      <td>
        <button onClick={() => onEditar(usuario)} className="btn-actions btn-edit">Editar</button>
        <button onClick={() => onExcluir(usuario.id)} className="btn-actions btn-delete">Excluir</button>
      </td>
    </tr>
  )
}

export function TabelaUsuarios({ listaUsuarios, onEditar, onExcluir }) {
  return (
    <div className="card">
      <h2>Alunos e Professores Cadastrados</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>CPF</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaUsuarios.map(itemUsuario => (
            <LinhaUsuario 
              key={itemUsuario.id} 
              usuario={itemUsuario} 
              onEditar={onEditar} 
              onExcluir={onExcluir} 
            />
          ))}
          
         
          {listaUsuarios.length === 0 && (
            <tr>
              <td colSpan="6" style={{ textAlign: 'center', color: '#64748b', padding: '1.5rem' }}>
                Nenhum aluno ou professor registrado no banco de dados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
