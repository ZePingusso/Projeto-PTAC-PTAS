
import dotenv from 'dotenv'
dotenv.config()

import app from './app.js'
import { conectar } from './data/db.js'

const PORT = process.env.PORT || 3000

async function iniciarServidor() {
    try {
        await conectar()

        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`)
        })
    } catch (erro) {
        console.error('Erro ao conectar ao MongoDB:', erro)
        process.exit(1)
    }
}

iniciarServidor()