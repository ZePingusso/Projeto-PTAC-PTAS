import { readData, writeData } from '../db.js'

export async function findAll() {
    return await readData()
}

export async function findById(id) {
    const pessoas = await readData()

    return pessoas.find(p => p.id === Number(id)) || null
}

export async function create(dados) {
    const pessoas = await readData()

    const id = pessoas.length
        ? Math.max(...pessoas.map(p => p.id)) + 1
        : 1

    const novaPessoa = { id, ...dados }

    pessoas.push(novaPessoa)

    await writeData(pessoas)

    return novaPessoa
}

export async function update(id, dados) {
    const pessoas = await readData()

    const indice = pessoas.findIndex(p => p.id === Number(id))

    if (indice === -1) return null

    pessoas[indice] = { id: Number(id), ...dados }

    await writeData(pessoas)

    return pessoas[indice]
}

export async function patch(id, dados) {
    const pessoas = await readData()

    const indice = pessoas.findIndex(p => p.id === Number(id))

    if (indice === -1) return null

    pessoas[indice] = {
        ...pessoas[indice],
        ...dados,
        id: Number(id)
    }

    await writeData(pessoas)

    return pessoas[indice]
}

export async function remove(id) {
    const pessoas = await readData()

    const novasPessoas = pessoas.filter(p => p.id !== Number(id))

    if (pessoas.length === novasPessoas.length) return false

    await writeData(novasPessoas)

    return true
}