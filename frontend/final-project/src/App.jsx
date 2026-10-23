import { useState, useEffect } from 'react'
import { FormularioCadastro } from './components/FormularioCadastro'
import { ListaUsuarios } from './components/ListaUsuarios'


const API_URL = 'http://localhost:3000/users'

function App() {
  const [usuarios, setUsuarios] = useState([])
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null)

  useEffect(() => {
    async function carregarDadosIniciais() {
      try {
        const response = await fetch(API_URL)
        const data = await response.json()
        setUsuarios(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error('Falha de comunicação de rede:', error)
      }
    }
    carregarDadosIniciais()
  }, []) 
  async function sincronizarTabela() {
    const response = await fetch(API_URL)
    const data = await response.json()
    setUsuarios(Array.isArray(data) ? data : [])
  }

  async function handleSalvar(dadosDoFormulario) {
    // Validação defensiva (RF02)
    if (!dadosDoFormulario.nome.trim() || !dadosDoFormulario.email.trim()) {
      alert('Nome e E-mail são campos obrigatórios!')
      return
    }

    try {
      const url = usuarioSelecionado ? `${API_URL}/${usuarioSelecionado.id}` : API_URL
      const method = usuarioSelecionado ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dadosDoFormulario)
      })

      if (!response.ok) {
        const erroServidor = await response.json()
        throw new Error(erroServidor.erro || 'Erro ao processar dados no servidor.')
      }

      setUsuarioSelecionado(null)
      await sincronizarTabela()
    } catch (error) {
      alert(error.message)
    }
  }

  async function handleExcluir(id) {
    if (!confirm(`Deseja confirmar a remoção lógica do cadastro #${id}?`)) return

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      if (response.ok || response.status === 204) {
        await sincronizarTabela()
      }
    } catch (error) {
      alert('Não foi possível efetuar a exclusão.')
    }
  }

  return (
    <div className="container">
      <h1> Controle Acadêmico Full-Stack</h1>
      
      <FormularioCadastro 
        usuarioEmEdicao={usuarioSelecionado} 
        onSalvar={handleSalvar} 
        onCancelar={() => setUsuarioSelecionado(null)} 
      />

      <div className="card">
        <h2>🔍 Alunos e Professores Cadastrados (RF06)</h2>
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
            <ListaUsuarios 
              usuarios={usuarios} 
              aoEditar={setUsuarioSelecionado} 
              aoExcluir={handleExcluir} 
            />
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default App
