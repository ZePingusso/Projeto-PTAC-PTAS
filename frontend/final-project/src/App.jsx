import { useEffect, useState } from 'react';
import FormularioCadastro from './components/FormularioCadastro';
import TabelaUsuarios from './components/TabelaUsuarios';
import { getUsuarios, postUsuario, putUsuario, deleteUsuario } from './services/api';
import './App.css';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [tentativa, setTentativa] = useState(0);
  const [usuarioEditando, setUsuarioEditando] = useState(null);


  useEffect(() => {
    const controle = new AbortController();

    async function carregar() {
      try {
        setCarregando(true);
        setErro(null);
        const dados = await getUsuarios(controle.signal);
        setUsuarios(dados);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message);
        }
      } finally {
        setCarregando(false);
      }
    }

    carregar();
    return () => controle.abort();
  }, [tentativa]);


  async function salvarUsuario(dadosFormulario) {
    if (usuarioEditando) {
      const atualizado = await putUsuario(usuarioEditando.id, dadosFormulario);
      setUsuarios(usuarios.map((u) => (u.id === atualizado.id ? atualizado : u)));
      setUsuarioEditando(null);
      return atualizado;
    } else {
      const criado = await postUsuario(dadosFormulario);
      setUsuarios([...usuarios, criado]);
      return criado;
    }
  }

  async function excluirUsuario(id) {
    if (!window.confirm('Tem certeza que deseja excluir este cadastro?')) return;

    try {
      await deleteUsuario(id);
      setUsuarios(usuarios.filter((u) => u.id !== id));
    } catch (e) {
      alert('Erro ao excluir: ' + e.message);
    }
  }

  if (carregando) {
    return (
      <div className="container">
        <p className="status-msg">Carregando sistema escolar...</p>
      </div>
    );
  }

  if (erro) {
    return (
      <div className="container">
        <p className="erro-msg">Erro: {erro}</p>
        <button className="btn-primario" onClick={() => setTentativa((t) => t + 1)}>
          Tentar novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="cabecalho">
        <h1>Sistema Escolar</h1>
        <p>Dupla: Lucas Bispo da Cruz e Enrique Meira Charão</p>
      </header>

      <FormularioCadastro
        key={usuarioEditando ? usuarioEditando.id : 'novo'}
        onSalvar={salvarUsuario}
        usuarioEditando={usuarioEditando}
        onCancelarEdicao={() => setUsuarioEditando(null)}
      />

      <TabelaUsuarios
        usuarios={usuarios}
        onEditar={(usuario) => setUsuarioEditando(usuario)}
        onExcluir={excluirUsuario}
      />
    </div>
  );
}
