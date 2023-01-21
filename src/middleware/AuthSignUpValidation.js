import db from "../database/database.js";

export async function authSignUpValidattion(req, res, next) {
    const { name, password, confirmation } = req.body;

    try {

        const userExist = await db.collection('users').findOne({ name });
        if (userExist) return res.status(409).send('Usuário já cadastrado!');
        if (password !== confirmation) return res.status(400).send('Senhas devem ser iguais.');

        next();

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}