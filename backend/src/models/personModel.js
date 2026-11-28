
import prisma from '../lib/prisma.js'

// Considera pessoas que não foram excluídas.
const filtroAtivos = {
    OR: [
        { deletedAt: null },
        { deletedAt: { isSet: false } }
    ]
}

function converterPessoa(pessoa) {
    if (!pessoa) {
        return null
    }

    const { id: mongoId, legacyId, deletedAt, ...dados } = pessoa

    return {
        ...dados,
        id: legacyId
    }
}

export async function findAll() {
    const pessoas = await prisma.person.findMany({
        where: filtroAtivos,
        orderBy: {
            legacyId: 'asc'
        }
    })

    return pessoas.map(converterPessoa)
}

export async function findById(id) {
    const pessoa = await prisma.person.findFirst({
        where: {
            legacyId: Number(id),
            ...filtroAtivos
        }
    })

    return converterPessoa(pessoa)
}

export async function create(dados) {
    const ultimo = await prisma.person.findFirst({
        orderBy: {
            legacyId: 'desc'
        }
    })

    const novoId = ultimo ? ultimo.legacyId + 1 : 1

    const novaPessoa = await prisma.person.create({
        data: {
            legacyId: novoId,
            ...dados
        }
    })

    return converterPessoa(novaPessoa)
}

export async function update(id, dados) {
    const dadosAtualizados = { ...dados }

    if (
        dados.category === 'student' &&
        !('discipline' in dados)
    ) {
        dadosAtualizados.discipline = null
    }

    const resultado = await prisma.person.updateMany({
        where: {
            legacyId: Number(id),
            ...filtroAtivos
        },
        data: dadosAtualizados
    })

    if (resultado.count === 0) {
        return null
    }

    return await findById(id)
}

export async function patch(id, dados) {
    const dadosAtualizados = { ...dados }

    if (
        dados.category === 'student' &&
        !('discipline' in dados)
    ) {
        dadosAtualizados.discipline = null
    }

    const resultado = await prisma.person.updateMany({
        where: {
            legacyId: Number(id),
            ...filtroAtivos
        },
        data: dadosAtualizados
    })

    if (resultado.count === 0) {
        return null
    }

    return await findById(id)
}

export async function remove(id) {
    const resultado = await prisma.person.updateMany({
        where: {
            legacyId: Number(id),
            ...filtroAtivos
        },
        data: {
            deletedAt: new Date()
        }
    })

    return resultado.count > 0
}
