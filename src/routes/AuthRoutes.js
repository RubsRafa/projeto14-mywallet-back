import { signUp, login, users, sessions } from '../controller/Auth.js';
import { Router } from 'express';
import { validateSchema } from '../middleware/validateSchema.js';
import { loginSchema, userSchema } from '../model/AuthModel.js';

const routerAuth = Router(); 

routerAuth.post('/sign-up', validateSchema(userSchema), signUp)
routerAuth.post('/login', validateSchema(loginSchema), login)
routerAuth.get('/users', users)
routerAuth.get('/sessions', sessions);

export default routerAuth; 