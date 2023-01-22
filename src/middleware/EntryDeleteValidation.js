import db from "../database/database.js";

export async function entryDeleteValidation(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');

    try {

        if (!token) return res.status(401).send('Informe o token');
        const session = await db.collection('sessions').findOne({ token });
        if (!session) return res.status(403).send('Token não autorizado');

        const userExist = await db.collection('users').findOne({ _id: session.userId });

        if (!userExist) return res.status(401).send('Usuario não existe');

        next(); 
        
    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
}