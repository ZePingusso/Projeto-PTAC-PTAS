
import { Router } from 'express'
import * as personService from '../../services/personService.js'
import { toPersonDTO } from '../../dtos/person.dto.js'

const router = Router()

router.get('/', async (req, res, next) => {
    try {
        const pessoas = await personService.listarPessoas()

        res.status(200).json({
            data: pessoas.map(toPersonDTO),
            meta: {
                total: pessoas.length
            }
        })
    } catch (erro) {
        next(erro)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const pessoa = await personService.buscarPessoa(req.params.id)

        if (!pessoa) {
            const erro = new Error(
                `Pessoa ${req.params.id} não existe`
            )
            erro.status = 404
            erro.titulo = 'Não encontrado'
            throw erro
        }

        res.status(200).json({
            data: toPersonDTO(pessoa),
            meta: {
                total: 1
            }
        })
    } catch (erro) {
        next(erro)
    }
})

export default router
