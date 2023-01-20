import { ObjectId } from 'mongodb';
import { registersSchema } from '../model/EntryModel.js';
import dayjs from 'dayjs';
import db from '../database/database.js';

export async function createEntry(req, res) {
    const { value, description, type } = req.body;
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    try {
        if (!token) return res.status(401).send('Token não existe')
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(401).send('Token não autorizado')

        const validation = registersSchema.validate({ value, description, type });
        if (validation.error) {
            const errors = validation.error.details.map((d) => d.message);
            return res.status(422).send(errors)
        }

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe')

        const tokenExist = await db.collection('sessions').findOne({ token });

        if (!tokenExist) return res.send(403)

        await db.collection('entry').insertOne({
            value, description, type, date: dayjs().format(`DD/MM`), idUser: userExist._id
        })

        return res.sendStatus(201)
    } catch (err) {
        return res.status(500).send(err)
    }
}
export async function getEntry(req, res) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '')

    try {

        const user = await db.collection('sessions').findOne({ token })

        if (!user) return res.sendStatus(404)

        const myEntry = await db.collection('entry').find({ idUser: new ObjectId(user.userId) }).toArray();

        return res.send(myEntry)

    } catch (err) {
        res.send(err)
    }

}

