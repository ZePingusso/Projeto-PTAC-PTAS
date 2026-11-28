
import * as personService from '../services/personService.js'
import { toPersonDTO } from '../dtos/person.dto.js'

function criarErroNaoEncontrado(id) {
    const erro = new Error(`Pessoa ${id} não existe`)
    erro.status = 404
    erro.titulo = 'Não encontrado'
    return erro
}

export async function listar(req, res, next) {
    try {
        const pessoas = await personService.listarPessoas()

        res.status(200).json(pessoas.map(toPersonDTO))
    } catch (erro) {
        next(erro)
    }
}

export async function buscar(req, res, next) {
    try {
        const pessoa = await personService.buscarPessoa(req.params.id)

        if (!pessoa) {
            throw criarErroNaoEncontrado(req.params.id)
        }

        res.status(200).json(toPersonDTO(pessoa))
    } catch (erro) {
        next(erro)
    }
}

export async function criar(req, res, next) {
    try {
        const pessoa = await personService.cadastrarPessoa(req.body)

        res.status(201).json(toPersonDTO(pessoa))
    } catch (erro) {
        next(erro)
    }
}

export async function atualizar(req, res, next) {
    try {
        const pessoa = await personService.atualizarPessoa(
            req.params.id,
            req.body
        )

        if (!pessoa) {
            throw criarErroNaoEncontrado(req.params.id)
        }

        res.status(200).json(toPersonDTO(pessoa))
    } catch (erro) {
        next(erro)
    }
}

export async function atualizarParcial(req, res, next) {
    try {
        const pessoa = await personService.atualizarParcialmente(
            req.params.id,
            req.body
        )

        if (!pessoa) {
            throw criarErroNaoEncontrado(req.params.id)
        }

        res.status(200).json(toPersonDTO(pessoa))
    } catch (erro) {
        next(erro)
    }
}

export async function excluir(req, res, next) {
    try {
        const excluido = await personService.excluirPessoa(req.params.id)

        if (!excluido) {
            throw criarErroNaoEncontrado(req.params.id)
        }

        res.status(200).json({
            mensagem: 'Pessoa excluída com sucesso'
        })
    } catch (erro) {
        next(erro)
    }
}
