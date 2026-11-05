export function valid(schema) {
    return (req, res, next) => {
        console.log('BODY RECEBIDO:', req.body)
        
        const resultado = schema.safeParse(req.body ?? {});

        if (!resultado.success) {
            return res.status(400).json({
                erro: 'Dados inválidos',
                detalhes: resultado.error.issues.map(erro => erro.message)
            })
        }

        req.body = resultado.data

        next()
    }
}