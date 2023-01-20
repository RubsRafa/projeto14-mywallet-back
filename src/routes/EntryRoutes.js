import { createEntry, getEntry } from '../controller/Entry.js';
import { Router } from 'express';

const routerEntry = Router(); 

routerEntry.post('/entry', createEntry);
routerEntry.get('/entry', getEntry);

export default routerEntry