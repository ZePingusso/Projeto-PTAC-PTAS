import express from 'express';
import personRoutes from './routes/personRoutes.js'

const app = express();

app.use(express.json());

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

app.use('/people', personRoutes)

export default app;