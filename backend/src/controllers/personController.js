import * as personService from '../services/personService.js'

export async function listar(req, res) {
    try {
        const pessoas = await personService.listarPessoas()
        res.json(pessoas)
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
}

export async function buscar(req, res) {
    try {
        const pessoa = await personService.buscarPessoa(req.params.id)

        if (!pessoa) {
            return res.status(404).json({ erro: 'Cadastro não encontrado' })
        }

        res.json(pessoa)
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
}

export async function criar(req, res) {
    try {
        const pessoa = await personService.cadastrarPessoa(req.body)
        res.status(201).json(pessoa)
    } catch (error) {
        res.status(error.status || 500).json({
            erro: error.message,
            detalhes: error.detalhes
        })
    }
}

export async function atualizar(req, res) {
    try {
        const pessoa = await personService.atualizarPessoa(
            req.params.id,
            req.body
        )

        if (!pessoa) {
            return res.status(404).json({ erro: 'Cadastro não encontrado' })
        }

        res.json(pessoa)
    } catch (error) {
        res.status(error.status || 500).json({
            erro: error.message,
            detalhes: error.detalhes
        })
    }
}

export async function atualizarParcial(req, res) {
    try {
        const pessoa = await personService.atualizarParcialmente(
            req.params.id,
            req.body
        )

        if (!pessoa) {
            return res.status(404).json({ erro: 'Cadastro não encontrado' })
        }

        res.json(pessoa)
    } catch (error) {
        res.status(error.status || 500).json({
            erro: error.message,
            detalhes: error.detalhes
        })
    }
}

export async function excluir(req, res) {
    try {
        const removido = await personService.excluirPessoa(req.params.id)

        if (!removido) {
            return res.status(404).json({ erro: 'Cadastro não encontrado' })
        }

        res.json({ mensagem: 'Cadastro excluído com sucesso' })
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
}