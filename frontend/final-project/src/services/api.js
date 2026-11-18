<<<<<<< HEAD
const URL_BASE = 'http://localhost:3000/peoples'

export async function getUsuarios(signal) {
  const resp = await fetch(URL_BASE, { signal })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return await resp.json()
}

export async function postUsuario(novoUsuario) {
  const resp = await fetch(URL_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(novoUsuario),
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return await resp.json()
}

export async function putUsuario(id, dadosAtualizados) {
  const resp = await fetch(`${URL_BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosAtualizados),
  })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
  return await resp.json()
}

export async function deleteUsuario(id) {
  const resp = await fetch(`${URL_BASE}/${id}`, { method: 'DELETE' })
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`)
}
=======
const CHAVE_STORAGE = 'sistema_escolar_usuarios';

const esperar = (ms = 300) => new Promise((resolve) => setTimeout(resolve, ms));


export async function getUsuarios(signal) {
  await esperar();

  if (signal?.aborted) {
    throw new DOMException('Aborted', 'AbortError');
  }

  const salvos = localStorage.getItem(CHAVE_STORAGE);
  if (salvos) {
    return JSON.parse(salvos);
  }

  const resp = await fetch('/usuarios.json', { signal });
  if (!resp.ok) {
    throw new Error(`HTTP ${resp.status} — Falha ao carregar base inicial`);
  }

  const data = await resp.json();
  const iniciais = data.map((u, index) => ({
    id: u.id,
    nome: u.name,
    email: u.email,
    senha: '******',
    cpf: `111.222.33${index}-44`,
    cargo: index % 2 === 0 ? 'Aluno' : 'Professor',
  }));

  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(iniciais));
  return iniciais;
}

export async function postUsuario(novoUsuario) {
  await esperar();
  const lista = await getUsuarios();

  const duplicado = lista.some(
    (u) => u.cpf === novoUsuario.cpf || u.email.toLowerCase() === novoUsuario.email.toLowerCase()
  );
  if (duplicado) {
    throw new Error('HTTP 400 — Já existe um cadastro com este CPF ou E-mail.');
  }

  const criado = { ...novoUsuario, id: Date.now() };
  const novaLista = [...lista, criado];
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
  return criado;
}

export async function putUsuario(id, dadosAtualizados) {
  await esperar();
  const lista = await getUsuarios();

  const novaLista = lista.map((u) =>
    u.id === id ? { ...dadosAtualizados, id } : u
  );
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
  return { ...dadosAtualizados, id };
}

export async function deleteUsuario(id) {
  await esperar();
  const lista = await getUsuarios();

  const novaLista = lista.filter((u) => u.id !== id);
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
}
>>>>>>> 3bfb8415cb127757418fbbee90d0e37fa44f8d64
