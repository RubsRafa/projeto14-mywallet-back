import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
import db from '../database/database.js';

export async function createEntry(req, res) {
    const { value, description, type } = req.body;
    const session = res.locals.session; 

    try {

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe');

        await db.collection('entry').insertOne({
            value, description, type, date: dayjs().format(`DD/MM`), idUser: userExist._id
        });

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err);
    }
};
export async function getEntry(req, res) {

    const user = res.locals.user; 

    try {

        const myEntry = await db.collection('entry').find({ idUser: new ObjectId(user.userId) }).toArray();
        const myBalance = myEntry.map((i) => {
            if (i.type === 'input') {
                return Number(i.value) * (1)
            } else {
                return Number(i.value) * (-1)
            }
        })
        let sum = 0;
        for (let i = 0; i < myBalance.length; i++) {
            sum += myBalance[i];
        }
        const results = sum.toFixed(2)
        
        return res.status(200).send({myEntry, results});

    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }

};
export async function deleteEntry(req, res) {
    const { id } = req.params;
    
    try {
        if (!id) return res.status(400).send('Informe o id do registro!')

        await db.collection('entry').deleteOne({
            _id: ObjectId(id)
        });

        return res.sendStatus(200);
    } catch (err) {
        return res.status(500).send(err);
    }
};
export async function editEntry(req, res) {
    const { id } = req.params;
    const { value, description, type } = req.body;
    const session = res.locals.session; 

    try {

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe');

        await db.collection('entry').updateOne(
            { _id: ObjectId(id) },
            { $set: { value, description, type, date: dayjs().format(`DD/MM`), idUser: userExist._id } });

        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err);
    }
};