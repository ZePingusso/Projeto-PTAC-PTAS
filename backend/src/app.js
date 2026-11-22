import express from 'express';
import personRoutes from './routes/personRoutes.js'
import cors from 'cors';

const app = express();

app.use(express.json());

app.use(cors());

app.use((req, res, next) => {
    console.log('Método:', req.method)
    console.log('URL:', req.url)
    console.log('Body:', req.body)

    next()
})

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Projeto Final de PTAC',
    })
})

app.use('/peoples', personRoutes)

export default app;