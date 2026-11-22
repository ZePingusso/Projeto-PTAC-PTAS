
import { obterDb } from '../data/db.js'

const COLLECTION = 'peoples'

function colecao() {
    return obterDb().collection(COLLECTION)
}

export async function findAll() {
    return await colecao().find().toArray()
}

export async function findById(id) {
    return await colecao().findOne({ id: Number(id) })
}

export async function create(dados) {
    const ultimo = await colecao().findOne(
        {},
        { sort: { id: -1 } }
    )

    const id = ultimo ? ultimo.id + 1 : 1

    const novaPessoa = {
        id,
        ...dados
    }

    await colecao().insertOne(novaPessoa)

    return novaPessoa
}

export async function update(id, dados) {
    const pessoaAtualizada = {
        id: Number(id),
        ...dados
    }

    const resultado = await colecao().replaceOne(
        { id: Number(id) },
        pessoaAtualizada
    )

    if (resultado.matchedCount === 0) {
        return null
    }

    return await findById(id)
}

export async function patch(id, dados) {
    const resultado = await colecao().updateOne(
        { id: Number(id) },
        { $set: dados }
    )

    if (resultado.matchedCount === 0) {
        return null
    }

    return await findById(id)
}

export async function remove(id) {
    const resultado = await colecao().deleteOne({
        id: Number(id)
    })

    return resultado.deletedCount > 0
}
