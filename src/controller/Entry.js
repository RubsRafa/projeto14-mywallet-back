import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
import db from '../database/database.js';

export async function createEntry(req, res) {
    const { value, description, type } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    try {
        if (!token) return res.status(401).send('Informe o token')
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(403).send('Token não autorizado')

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe')

        await db.collection('entry').insertOne({
            value, description, type, date: dayjs().format(`DD/MM`), idUser: userExist._id
        })

        return res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err)
    }
};
export async function getEntry(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    try {

        const user = await db.collection('sessions').findOne({ token })

        if (!user) return res.sendStatus(404)

        const myEntry = await db.collection('entry').find({ idUser: new ObjectId(user.userId) }).toArray();

        return res.status(200).send(myEntry)

    } catch (err) {
        res.status(500).send(err)
    }

};
export async function deleteEntry(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')
    const { id } = req.params;

    try {
        if (!token) return res.status(401).send('Informe o token')
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(403).send('Token não autorizado')

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe')

        await db.collection('entry').deleteOne({
            _id: ObjectId(id)
        })

        return res.sendStatus(200)
    } catch (err) {
        return res.status(500).send(err)
    }
};
export async function editEntry(req, res) {
    const { id } = req.params;
    const { value, description, type } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    try {
        if (!token) return res.status(401).send('Informe o token')
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(403).send('Token não autorizado')

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe')

        await db.collection('entry').updateOne(
            { _id: ObjectId(id) },
            { $set: { value, description, type, date: dayjs().format(`DD/MM`), idUser: userExist._id } })

        return res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err)
    }
};