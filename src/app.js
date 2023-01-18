import express from 'express';
import cors from 'cors';
import joi from 'joi';
import dayjs from 'dayjs';
// import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

// const mongoClient = new MongoClient(process.env.DATABASE_URL);

// await mongoClient.connect();
// const db = mongoClient.db(); 

const app = express();
app.use(cors());
app.use(express.json());


app.listen(process.env.PORT, () => console.log(`Servidor funcionando na porta ${process.env.PORT}`));

const users = [];
const entry = [];

app.post('/registration', (req, res) => {
    const { name, email, password, confirmation } = req.body;

    try {
        const userSchema = joi.object({
            name: joi.string().required(),
            email: joi.string().email({ tlds: { allow: false } }).required(),
            password: joi.string().required(),
            confirmation: joi.string().required()
        });
        const validation = userSchema.validate({ name, email, password, confirmation }, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }

        users.map((u) => {
            if (u.name === name || u.email === email) {
                return res.status(409).send('Usuário já cadastrado!')
            }
        })
        if (password !== confirmation) return res.status(406).send('Senhas devem ser iguais')

        users.push({ name, email, password, confirmation });
        return res.status(200).send(users)

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }

})
app.get('/registration', (req, res) => {
    res.send(entry)
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    try {
        const loginSchema = joi.object({
            email: joi.string().email({ tlds: { allow: false } }).required(),
            password: joi.string().required()
        })
        const validation = loginSchema.validate({ email, password });
        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }

        users.find((u) => {
            if (u.email === email && u.password === password) {
                return res.sendStatus(200)
            } else {
                return res.status(404).send('Usuário não cadastrado.')
            }
        })

    } catch(err) {
        return res.status(500).send(err)
    }
})
app.post('/input', (req, res) => {
    const { value, description } = req.body; 
    // const { user } = req.header; 
    try {
        // const userExist = users.find((u) => u.name === user);
        // if (!userExist) return res.sendStatus(404)
        const registersSchema = joi.object({
            value: joi.string().required(),
            description: joi.string().required()
        })
        const validation = registersSchema.validate({ value, description });
        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }
        entry.push({ value, description, type: 'input', date: dayjs().format(`DD/MM`) })
        return res.sendStatus(200)
    } catch(err) {
        return res.status(500).send(err)
    }
});
app.post('/output', (req, res) => {
    const { value, description } = req.body; 
    // const { user } = req.header; 
    try {
        // const userExist = users.find((u) => u.name === user);
        // if (!userExist) return res.sendStatus(404)
        const registersSchema = joi.object({
            value: joi.string().required(),
            description: joi.string().required()
        })
        const validation = registersSchema.validate({ value, description });
        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }
        entry.push({ value, description, type: 'output', date: dayjs().format(`DD/MM`) })
        return res.sendStatus(200)
    } catch(err) {
        return res.status(500).send(err)
    }
});
// app.post('/') > email, password; > find.
// app.get('/') > id, email, password, name; 
// app.post('/cadastro') > name, email, password, confirmation; 
// app.get('/home') > name, registers; 
// app.post('/nova-entrada') > value, description; 
// app.post('/nova-saida') > value, description; 
// user = [{ id, name, email, password, registers }]
// registers = [{id, value, description}, {id, value, description}, {id, value, description}]
