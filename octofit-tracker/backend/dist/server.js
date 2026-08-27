import express from 'express';
import { connectDatabase } from './config/database.js';
import apiRouter from './routes.js';
const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express.json());
app.use((_request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    if (response.req.method === 'OPTIONS') {
        response.sendStatus(204);
        return;
    }
    next();
});
app.use('/api', apiRouter);
app.use((error, _request, response, _next) => {
    console.error(error);
    response.status(400).json({ error: 'Request could not be completed' });
});
async function startServer() {
    try {
        await connectDatabase();
        app.listen(port, () => {
            console.log(`OctoFit backend listening at ${baseUrl}`);
        });
    }
    catch (error) {
        console.error('Unable to connect to MongoDB:', error);
        process.exitCode = 1;
    }
}
startServer();
