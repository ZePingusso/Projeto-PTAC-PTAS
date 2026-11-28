
export function valid(schema) {
    return (req, res, next) => {
        const resultado = schema.safeParse(req.body)

        if (!resultado.success) {
            const erro = new Error('Os dados enviados são inválidos')

            erro.status = 400
            erro.titulo = 'Dados inválidos'
            erro.detalhe = resultado.error.issues
                .map(item => item.message)
                .join(', ')

            return next(erro)
        }

        req.body = resultado.data

        next()
    }
}
