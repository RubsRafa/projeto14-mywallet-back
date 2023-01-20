import express from 'express';
import cors from 'cors';
import routerAuth from './routes/AuthRoutes.js';
import routerEntry from './routes/EntryRoutes.js';
// import joi from 'joi';
// import dayjs from 'dayjs';
// import bcrypt from 'bcrypt';
// import { v4 as uuid } from 'uuid';
// import { ObjectId } from 'mongodb';
// import db from './database/database.js';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.use([routerAuth, routerEntry]);


app.listen(process.env.PORT, () => console.log(`Servidor funcionando na porta ${process.env.PORT}`));


// app.post('/sign-up', async (req, res) => {
//     const { name, email, password, confirmation } = req.body;
//     const passwordHashed = bcrypt.hashSync(password, 10)


//     try {
//         const userSchema = joi.object({
//             name: joi.string().required(),
//             email: joi.string().email({ tlds: { allow: false } }).required(),
//             password: joi.string().required(),
//             confirmation: joi.string().required()
//         });
//         const validation = userSchema.validate({ name, email, password, confirmation }, { abortEarly: false });
//         if (validation.error) {
//             const errors = validation.error.details.map((d) => d.message);
//             return res.status(422).send(errors)
//         }
//         const userExist = await db.collection('users').findOne({ name })
//         if (userExist) return res.status(409).send('Usuário já cadastrado!')
//         if (password !== confirmation) return res.status(400).send('Senhas devem ser iguais.')
        
//         await db.collection('users').insertOne({ name, email, password: passwordHashed });
//         return res.sendStatus(201)

//     } catch (err) {
//         console.log(err)
//         return res.status(500).send(err)
//     }

// })
// app.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const loginSchema = joi.object({
//             email: joi.string().email({ tlds: { allow: false } }).required(),
//             password: joi.string().required()
//         })
//         const validation = loginSchema.validate({ email, password });
        
//         if (validation.error) {
//             const errors = validation.error.details.map((d) => d.message);
//             return res.status(422).send(errors)
//         }

//         let id; 
//         const userExist = await db.collection('users').findOne({ email })
//         .then((u) => id = u._id)
        
//         await db.collection('sessions').deleteMany({ userId: userExist._id })

//         if (userExist && bcrypt.compareSync(password, userExist.password)) {
//             const token = uuid(); 
//             await db.collection('sessions').insertOne({
//                 userId: userExist._id,
//                 token
//             })
//             return res.send({token, id })
//         } else {
//             return res.status(404).send('Usuário não encontrado. Email ou senha incorretos.')
//         }



//     } catch(err) {
//         return res.status(500).send(err)
//     }
// })
// app.post('/entry', async (req, res) => {
//     const { value, description, type } = req.body; 
//     console.log({ value, description, type })
//     const { authorization } = req.headers;
//     const token = authorization?.replace('Bearer ', '') 

//     try {
//         if (!token) return res.status(401).send('Token não existe')
//         const session = await db.collection('sessions').findOne({ token });
//         if (!session) return res.status(401).send('Token não autorizado')
        
//         const registersSchema = joi.object({
//             value: joi.string().required(),
//             description: joi.string().required(),
//             type: joi.string().valid("input", "output").required(),
//         })
//         const validation = registersSchema.validate({ value, description, type });
//         if (validation.error) {
//             const errors = validation.error.details.map((d) => d.message);
//             return res.status(422).send(errors)
//         }

//         const userExist = await db.collection('users').findOne({ _id: session.userId });

//         if (!userExist) return res.status(401).send('Usuario não existe')

//         const tokenExist = await db.collection('sessions').findOne({ token });

//         if (!tokenExist) return res.send(403)

//         await db.collection('entry').insertOne({
//             value, description, type, date: dayjs().format(`DD/MM`), idUser: userExist._id
//         })

//         return res.sendStatus(201)
//     } catch(err) {
//         return res.status(500).send(err)
//     }
// });


// app.get('/users', async (req, res) => {
//     const users = await db.collection('users').find().toArray(); 
//     res.send(users)
// })
// app.get('/entry', async (req, res) => {
//     const { authorization } = req.headers;
//     const id = authorization.replace('Bearer ', '')

//     const myBalance = await db.collection('entry').find({ idUser: ObjectId(id) }).toArray();
//     const entry = await db.collection('entry').find().toArray();

//     res.send(entry)
// });
// app.get('/sessions', async (req, res) => {
//     const sessions = await db.collection('sessions').find().toArray(); 
//     res.send(sessions)
// });
// app.post('/') > email, password; > find.
// app.get('/') > id, email, password, name; 
// app.post('/cadastro') > name, email, password, confirmation; 
// app.get('/home') > name, registers; 
// app.post('/nova-entrada') > value, description; 
// app.post('/nova-saida') > value, description; 
// user = [{ id, name, email, password, registers }]
// registers = [{id, value, description}, {id, value, description}, {id, value, description}]
