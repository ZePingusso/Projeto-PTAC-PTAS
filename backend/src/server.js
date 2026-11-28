
import 'dotenv/config'

import app from './app.js'
import prisma from './lib/prisma.js'

const PORT = process.env.PORT || 3000

async function iniciarServidor() {
    try {
        await prisma.$connect()

        console.log('Conectado ao MongoDB Atlas através do Prisma!')

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    } catch (erro) {
        console.error('Erro ao conectar ao banco de dados:', erro)
        process.exit(1)
    }
}

iniciarServidor()
