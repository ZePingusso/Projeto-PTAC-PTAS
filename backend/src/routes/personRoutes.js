import { Router } from 'express'

import {
    listar,
    buscar,
    criar,
    atualizar,
    atualizarParcial,
    excluir
} from '../controllers/personController.js'

import { valid } from '../middleware/valid.js'

import {
    personSchema,
    updatePersonSchema
} from '../schemas/personSchema.js'

const router = Router()

router.get('/', listar)
router.get('/:id', buscar)

router.post('/', valid(personSchema), criar)

router.put('/:id', valid(personSchema), atualizar)

router.patch('/:id', valid(updatePersonSchema), atualizarParcial)

router.delete('/:id', excluir)

export default router