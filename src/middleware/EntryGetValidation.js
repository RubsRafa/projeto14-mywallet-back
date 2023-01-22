import db from "../database/database.js";

export async function entryGetValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {

        const user = await db.collection('sessions').findOne({ token });

        if (!user) return res.sendStatus(404);

        res.locals.user = user; 

        next(); 

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}