import { signUp, login, users, sessions } from '../controller/Auth.js';
import { Router } from 'express';
import { validateSchema } from '../middleware/validateSchema.js';
import { loginSchema, userSchema } from '../model/AuthModel.js';
import { authSignUpValidattion } from '../middleware/AuthSignUpValidation.js';
import { authLoginValidattion } from '../middleware/AuthLoginValidation.js';

const routerAuth = Router(); 

routerAuth.post('/sign-up', validateSchema(userSchema), authSignUpValidattion, signUp);
routerAuth.post('/login', validateSchema(loginSchema), authLoginValidattion, login);
routerAuth.get('/users', users);
routerAuth.get('/sessions', sessions);

export default routerAuth; 