
const URL_BASE = 'http://localhost:3000/peoples';

function converterUsuario(pessoa) {
  return {
    id: pessoa.id,
    nome: pessoa.name,
    email: pessoa.email,
    cpf: pessoa.cpf,
    cargo: pessoa.category === 'student' ? 'Aluno' : 'Professor',
    disciplina: pessoa.discipline || '',
    senha: ''
  };
}

function converterPessoa(usuario) {
  return {
    name: usuario.nome,
    email: usuario.email,
    cpf: usuario.cpf,
    category: usuario.cargo === 'Aluno' ? 'student' : 'teacher',
    ...(usuario.cargo === 'Professor' && {
      discipline: usuario.disciplina
    })
  };
}

export async function getUsuarios(signal) {
  const resp = await fetch(URL_BASE, { signal });

  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  const dados = await resp.json();

  return dados.map(converterUsuario);
}

export async function postUsuario(novoUsuario) {
  const resp = await fetch(URL_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(converterPessoa(novoUsuario))
  });

  const dados = await resp.json();

  console.log('Status:', resp.status);
  console.log('Resposta do backend:', dados);

  if (!resp.ok) {
    throw new Error(
      dados.detalhes
        ? dados.detalhes.join(', ')
        : dados.erro || `HTTP ${resp.status}`
    );
  }

  return converterUsuario(dados);
}

export async function putUsuario(id, dadosAtualizados) {
  const resp = await fetch(`${URL_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(converterPessoa(dadosAtualizados))
  });

  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);

  return converterUsuario(await resp.json());
}

export async function deleteUsuario(id) {
  const resp = await fetch(`${URL_BASE}/${id}`, {
    method: 'DELETE'
  });

  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
}
