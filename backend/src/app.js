import express from 'express';
import personRoutes from './routes/v1/personRoutes.js'
import personRoutesV2 from './routes/v2/personRoutes.js'
import { errorHandler } from './middleware/errorHandler.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/v1/peoples', personRoutes)
app.use('/api/v2/peoples', personRoutesV2)

app.use((req, res, next) => {
    const erro = new Error(`Rota ${req.originalUrl} não encontrada`)
    erro.status = 404
    erro.titulo = 'Rota não encontrada'

    next(erro)
})

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Projeto Final de PTAC',
    })
})


app.use(errorHandler);

export default app;