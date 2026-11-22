
import 'dotenv/config'
import dns from 'node:dns'
import { MongoClient } from 'mongodb'

// Configuração de DNS
dns.setServers(['8.8.8.8', '1.1.1.1'])

// Cliente MongoDB
const client = new MongoClient(process.env.MONGODB_URI)

let db

export async function conectar() {
    await client.connect()

    db = client.db('ptas3')

    await db.command({ ping: 1 })

    console.log('Conectado ao MongoDB Atlas!')

    return db
}

export function obterDb() {
    if (!db) {
        throw new Error('Banco de dados não conectado')
    }

    return db
}
