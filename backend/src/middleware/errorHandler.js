
function erroFormat(status, titulo, detalhe) {
    return {
        status,
        titulo,
        detalhe,
        timestamp: new Date().toISOString()
    }
}


export function errorHandler(err, req, res, next) {
    const status = err.status || 500

    const titulos = {
        400: 'Dados inválidos',
        404: 'Não encontrado',
        409: 'Conflito',
        500: 'Erro interno'
    }

    const detalhe =
        err.detalhe ||
        (Array.isArray(err.detalhes)
            ? err.detalhes.join(', ')
            : err.detalhes) ||
        err.message ||
        'Ocorreu um erro inesperado'

    console.error(err)

    res.status(status).json({
        status,
        titulo: err.titulo || titulos[status] || 'Erro',
        detalhe,
        timestamp: new Date().toISOString()
    })
}

