import { useState, useEffect } from 'react'

export function FormularioCadastro({ usuarioEmEdicao, onSalvar, onCancelar }) {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [cpf, setCpf] = useState('')
  const [cargo, setCargo] = useState('aluno')

  useEffect(() => {
    if (usuarioEmEdicao) {
      setNome(usuarioEmEdicao.nome)
      setEmail(usuarioEmEdicao.email)
      setCpf(usuarioEmEdicao.cpf || '')
      setCargo(usuarioEmEdicao.cargo)
    } else {
      limparCamposFormulario()
    }
  }, [usuarioEmEdicao])

  function limparCamposFormulario() {
    setNome('')
    setEmail('')
    setSenha('')
    setCpf('')
    setCargo('aluno')
  }

  function handleSubmit(e) {
    e.preventDefault()
 
    onSalvar({ nome, email, senha, cpf, cargo })
    
    
    if (!usuarioEmEdicao) limparCamposFormulario()
  }

  return (
    <div className="card">
      <h2>{usuarioEmEdicao ? `Editar Cadastro #${usuarioEmEdicao.id}` : 'Criar Novo Cadastro'}</h2>
      <form onSubmit={handleSubmit} className="grid-form">
        <div className="form-group">
          <label>Nome *</label>
          <input type="text" value={nome} onChange={e => setNome(e.target.value)} placeholder="Nome completo" />
        </div>

        <div className="form-group">
          <label>E-mail *</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="exemplo@escola.com" />
        </div>

        
        {!usuarioEmEdicao && (
          <div className="form-group">
            <label>Senha *</label>
            <input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Senha de acesso" />
          </div>
        )}

        <div className="form-group">
          <label>CPF</label>
          <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="000.000.000-00" />
        </div>

        <div className="form-group">
          <label>Cargo *</label>
          <select value={cargo} onChange={e => setCargo(e.target.value)}>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
          </select>
        </div>

        <div className="form-buttons full-width">
          <button type="submit" className="btn btn-primary">Salvar Dados</button>
          {usuarioEmEdicao && (
            <button type="button" onClick={onCancelar} className="btn btn-secondary">Cancelar</button>
          )}
        </div>
      </form>
    </div>
  )
}
