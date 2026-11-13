import { useState } from 'react';

export default function FormularioCadastro({ onSalvar, usuarioEditando, onCancelarEdicao }) {
  const [nome, setNome] = useState(usuarioEditando ? usuarioEditando.nome : '');
  const [email, setEmail] = useState(usuarioEditando ? usuarioEditando.email : '');
  const [senha, setSenha] = useState(usuarioEditando ? usuarioEditando.senha : '');
  const [cpf, setCpf] = useState(usuarioEditando ? usuarioEditando.cpf : '');
  const [cargo, setCargo] = useState(usuarioEditando ? usuarioEditando.cargo : 'Aluno');
  const [erroForm, setErroForm] = useState('');

  function limparCampos() {
    setNome('');
    setEmail('');
    setSenha('');
    setCpf('');
    setCargo('Aluno');
    setErroForm('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    setErroForm('');

    if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !cargo) {
      setErroForm('Por favor, preencha todos os campos obrigatórios (Nome, E-mail, Senha, CPF e Cargo).');
      return;
    }

    onSalvar({
      nome,
      email,
      senha,
      cpf,
      cargo,
    });

    limparCampos();
  }

  return (
    <section className="card">
      <h2>{usuarioEditando ? 'Atualizar Cadastro (RF03)' : 'Cadastrar Aluno ou Professor (RF01)'}</h2>

      {erroForm && <p className="erro-msg">{erroForm}</p>}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label>Nome completo *</label>
          <input
            type="text"
            placeholder="Digite o nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="campo">
          <label>E-mail *</label>
          <input
            type="email"
            placeholder="exemplo@escola.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="linha-dupla">
          <div className="campo">
            <label>Senha *</label>
            <input
              type="password"
              placeholder="Digite a senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>CPF *</label>
            <input
              type="text"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
            />
          </div>

          <div className="campo">
            <label>Cargo *</label>
            <select value={cargo} onChange={(e) => setCargo(e.target.value)}>
              <option value="Aluno">Aluno</option>
              <option value="Professor">Professor</option>
            </select>
          </div>
        </div>

        <div className="botoes-form">
          <button type="submit" className="btn-primario">
            {usuarioEditando ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          {usuarioEditando && (
            <button type="button" className="btn-secundario" onClick={onCancelarEdicao}>
              Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
