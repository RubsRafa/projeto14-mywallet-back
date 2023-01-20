import { signUp, login, users, sessions } from '../controller/Auth.js';
import { Router } from 'express';

const routerAuth = Router(); 

routerAuth.post('/sign-up', signUp)
routerAuth.post('/login', login)
routerAuth.get('/users', users)
routerAuth.get('/sessions', sessions);

export default routerAuth; 