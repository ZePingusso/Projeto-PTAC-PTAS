import { useEffect, useState } from 'react';
import FormularioCadastro from './components/FormularioCadastro';
import TabelaUsuarios from './components/TabelaUsuarios';
import './App.css';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);


  const [tentativa, setTentativa] = useState(0);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  
  useEffect(() => {
    const controle = new AbortController();
    const signal = controle.signal;

    async function buscarUsuarios() {
      try {
        setCarregando(true);
        setErro(null);

        const resp = await fetch('/usuarios.json', { signal });
        if (!resp.ok) {
          throw new Error(`HTTP ${resp.status} — ${resp.statusText}`);
        }

        const data = await resp.json();

    
        const dadosIniciais = data.slice(0, 4).map((u, index) => ({
          id: u.id,
          nome: u.name,
          email: u.email,
          senha: '******',
          cpf: `111.222.33${index}-44`,
          cargo: index % 2 === 0 ? 'Aluno' : 'Professor',
        }));

        setUsuarios(dadosIniciais);
      } catch (e) {
        if (e.name !== 'AbortError') {
          setErro(e.message);
        }
      } finally {
        setCarregando(false);
      }
    }

    buscarUsuarios();

    return () => controle.abort();
  }, [tentativa]);


  function salvarUsuario(dadosFormulario) {
    if (usuarioEditando) {
      const listaAtualizada = usuarios.map((u) =>
        u.id === usuarioEditando.id ? { ...dadosFormulario, id: usuarioEditando.id } : u
      );
      setUsuarios(listaAtualizada);
      setUsuarioEditando(null);
    } else {
      const novoUsuario = {
        ...dadosFormulario,
        id: Date.now(),
      };
      setUsuarios([...usuarios, novoUsuario]);
    }
  }


  function excluirUsuario(id) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este cadastro?');
    if (confirmar) {
      setUsuarios(usuarios.filter((u) => u.id !== id));
    }
  }

  if (carregando) {
    return (
      <div className="container">
        <p className="status-msg">Carregando dados...</p>
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
