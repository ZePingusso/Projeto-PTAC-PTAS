import express from 'express';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        status: 'ok',
        service: 'Projeto Final de PTAC',
    })
})

export default app;