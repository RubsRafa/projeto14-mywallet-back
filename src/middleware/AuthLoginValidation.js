import db from "../database/database.js";

export async function authLoginValidattion(req, res, next) {
    const { email } = req.body;

    try {
        const userExist = await db.collection('users').findOne({ email });
        if (!userExist) return res.status(404).send('Usuário não encontrado. Email ou senha incorretos.');

        res.locals.user = userExist;

        next();
    } catch (error) {

        return res.status(500).send(error);
    }
}