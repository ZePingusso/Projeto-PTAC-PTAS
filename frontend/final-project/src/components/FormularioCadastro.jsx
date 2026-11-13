import { useEffect, useRef, useState } from 'react';

export default function FormularioCadastro({ onSalvar, usuarioEditando, onCancelarEdicao }) {
  const [nome, setNome] = useState(usuarioEditando ? usuarioEditando.nome : '');
  const [email, setEmail] = useState(usuarioEditando ? usuarioEditando.email : '');
  const [senha, setSenha] = useState(usuarioEditando ? usuarioEditando.senha : '');
  const [cpf, setCpf] = useState(usuarioEditando ? usuarioEditando.cpf : '');
  const [cargo, setCargo] = useState(usuarioEditando ? usuarioEditando.cargo : 'Aluno');

  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState(null);
  const [mensagemSucesso, setMensagemSucesso] = useState(null);

  const controleRef = useRef(null);

  useEffect(() => {
    return () => {
      if (controleRef.current) {
        controleRef.current.abort();
      }
    };
  }, []);

  function limparCampos() {
    setNome('');
    setEmail('');
    setSenha('');
    setCpf('');
    setCargo('Aluno');
  }

  async function enviar(e) {
    e.preventDefault(); 
    setErro(null);
    setMensagemSucesso(null);

   
    if (!nome.trim() || !email.trim() || !senha.trim() || !cpf.trim() || !cargo) {
      setErro('Preencha todos os campos obrigatórios (Nome, E-mail, Senha, CPF e Cargo).');
      return;
    }

    controleRef.current = new AbortController();

    try {
      setEnviando(true);

      const salvo = await onSalvar(
        { nome, email, senha, cpf, cargo },
        controleRef.current.signal
      );

      setMensagemSucesso(
        usuarioEditando
          ? `Cadastro de ${salvo.nome} atualizado com sucesso!`
          : `Cadastrado com sucesso! ID: ${salvo.id} — Nome: ${salvo.nome}`
      );

      limparCampos();
    } catch (err) {
      if (err.name !== 'AbortError') {
        setErro(err.message);
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="card">
      <h2>{usuarioEditando ? 'Atualizar Cadastro (RF03)' : 'Cadastrar Aluno ou Professor (RF01)'}</h2>

      <form onSubmit={enviar} className="formulario">
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
          <button type="submit" className="btn-primario" disabled={enviando}>
            {enviando ? 'Enviando...' : usuarioEditando ? 'Salvar Alterações' : 'Cadastrar'}
          </button>

          {usuarioEditando && (
            <button type="button" className="btn-secundario" onClick={onCancelarEdicao} disabled={enviando}>
              Cancelar
            </button>
          )}
        </div>

        {enviando && <p className="status-msg">Enviando dados...</p>}
        {erro && <p className="erro-msg">Erro: {erro}</p>}
        {mensagemSucesso && (
          <p style={{ color: '#15803d', backgroundColor: '#dcfce7', padding: '10px', borderRadius: '5px', fontSize: '14px' }}>
            {mensagemSucesso}
          </p>
        )}
      </form>
    </section>
  );
}
