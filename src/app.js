import express from 'express';
import cors from 'cors';
import routerAuth from './routes/AuthRoutes.js';
import routerEntry from './routes/EntryRoutes.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use([routerAuth, routerEntry]);


app.listen(process.env.PORT, () => console.log(`Servidor funcionando na porta ${process.env.PORT}`));