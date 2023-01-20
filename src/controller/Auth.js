import { userSchema, loginSchema } from '../model/AuthModel.js';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import db from '../database/database.js';

export async function signUp(req, res) {
    const { name, email, password, confirmation } = req.body;
    const passwordHashed = bcrypt.hashSync(password, 10)


    try {
        const validation = userSchema.validate({ name, email, password, confirmation }, { abortEarly: false });
        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }
        const userExist = await db.collection('users').findOne({ name })
        if (userExist) return res.status(409).send('Usuário já cadastrado!')
        if (password !== confirmation) return res.status(400).send('Senhas devem ser iguais.')

        await db.collection('users').insertOne({ name, email, password: passwordHashed });
        return res.sendStatus(201)

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function login(req, res) {
    const { email, password } = req.body;

    try {
        const validation = loginSchema.validate({ email, password });

        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }

    
        const userExist = await db.collection('users').findOne({ email })

        await db.collection('sessions').deleteMany({ userId: userExist._id })

        if (userExist && bcrypt.compareSync(password, userExist.password)) {
            const token = uuid();
            await db.collection('sessions').insertOne({
                userId: userExist._id,
                token
            })
            return res.send({ token })
        } else {
            return res.status(404).send('Usuário não encontrado. Email ou senha incorretos.')
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

export async function users(req, res) {
    const users = await db.collection('users').find().toArray();
    res.send(users)
}

export async function sessions(req, res) {
    const sessions = await db.collection('sessions').find().toArray();
    res.send(sessions)
}

