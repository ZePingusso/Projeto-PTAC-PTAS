import * as personModel from '../models/personModel.js'
import { personSchema } from '../schemas/personSchema.js'

function verificarDuplicidade(pessoas, dados, id = null) {
    const duplicado = pessoas.find(p =>
        p.id !== Number(id) &&
        (p.email === dados.email || p.cpf === dados.cpf)
    )

    if (duplicado) {
        const erro = new Error('E-mail ou CPF já cadastrado')
        erro.status = 409
        throw erro
    }
}

export async function listarPessoas() {
    return await personModel.findAll()
}

export async function buscarPessoa(id) {
    return await personModel.findById(id)
}

export async function cadastrarPessoa(dados) {
    const resultado = personSchema.safeParse(dados)

    if (!resultado.success) {
        const erro = new Error('Dados inválidos')
        erro.status = 400
        erro.detalhes = resultado.error.issues.map(e => e.message)
        throw erro
    }

    const pessoas = await personModel.findAll()

    verificarDuplicidade(pessoas, resultado.data)

    return await personModel.create(resultado.data)
}

export async function atualizarPessoa(id, dados) {
    const pessoa = await personModel.findById(id)

    if (!pessoa) return null

    const pessoas = await personModel.findAll()

    verificarDuplicidade(pessoas, dados, id)

    return await personModel.update(id, dados)
}

export async function atualizarParcialmente(id, dados) {
    const pessoa = await personModel.findById(id)

    if (!pessoa) return null

    const dadosAtualizados = {
        ...pessoa,
        ...dados
    }

    const resultado = personSchema.safeParse(dadosAtualizados)

    if (!resultado.success) {
        const erro = new Error('Dados inválidos')
        erro.status = 400
        erro.detalhes = resultado.error.issues.map(e => e.message)
        throw erro
    }

    const pessoas = await personModel.findAll()

    verificarDuplicidade(pessoas, dadosAtualizados, id)

    return await personModel.patch(id, resultado.data)
}

export async function excluirPessoa(id) {
    return await personModel.remove(id)
}