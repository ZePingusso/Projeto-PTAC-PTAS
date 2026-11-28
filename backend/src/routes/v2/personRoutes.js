import { Router } from 'express'

import * as personService from '../../services/personService.js'
import { toPersonDTO } from '../../dtos/person.dto.js'
import { valid } from '../../middleware/valid.js'

import {
    personSchema,
    updatePersonSchema
} from '../../schemas/personSchema.js'

const router = Router()

// Listar todas as pessoas
router.get('/', async (req, res, next) => {
    try {
        const pessoas = await personService.listarPessoas()

        res.json({
            data: pessoas.map(toPersonDTO),
            meta: {
                total: pessoas.length
            }
        })
    } catch (erro) {
        next(erro)
    }
})

// Buscar pessoa por ID
router.get('/:id', async (req, res, next) => {
    try {
        const pessoa = await personService.buscarPessoa(req.params.id)

        if (!pessoa) {
            const erro = new Error('Pessoa não encontrada')
            erro.status = 404
            return next(erro)
        }

        res.json({
            data: toPersonDTO(pessoa),
            meta: {
                total: 1
            }
        })
    } catch (erro) {
        next(erro)
    }
})

// Cadastrar pessoa
router.post('/', valid(personSchema), async (req, res, next) => {
    try {
        const pessoa = await personService.cadastrarPessoa(req.body)

        res.status(201).json({
            data: toPersonDTO(pessoa),
            meta: {
                mensagem: 'Pessoa cadastrada com sucesso'
            }
        })
    } catch (erro) {
        next(erro)
    }
})

// Atualizar pessoa completamente
router.put('/:id', valid(personSchema), async (req, res, next) => {
    try {
        const pessoa = await personService.atualizarPessoa(
            req.params.id,
            req.body
        )

        if (!pessoa) {
            const erro = new Error('Pessoa não encontrada')
            erro.status = 404
            return next(erro)
        }

        res.json({
            data: toPersonDTO(pessoa),
            meta: {
                mensagem: 'Pessoa atualizada com sucesso'
            }
        })
    } catch (erro) {
        next(erro)
    }
})

// Atualizar pessoa parcialmente
router.patch('/:id', valid(updatePersonSchema), async (req, res, next) => {
    try {
        const pessoa = await personService.atualizarParcialmente(
            req.params.id,
            req.body
        )

        if (!pessoa) {
            const erro = new Error('Pessoa não encontrada')
            erro.status = 404
            return next(erro)
        }

        res.json({
            data: toPersonDTO(pessoa),
            meta: {
                mensagem: 'Pessoa atualizada parcialmente com sucesso'
            }
        })
    } catch (erro) {
        next(erro)
    }
})

// Excluir pessoa
router.delete('/:id', async (req, res, next) => {
    try {
        const excluida = await personService.excluirPessoa(req.params.id)

        if (!excluida) {
            const erro = new Error('Pessoa não encontrada')
            erro.status = 404
            return next(erro)
        }

        res.json({
            data: null,
            meta: {
                mensagem: 'Pessoa excluída com sucesso'
            }
        })
    } catch (erro) {
        next(erro)
    }
})

export default router