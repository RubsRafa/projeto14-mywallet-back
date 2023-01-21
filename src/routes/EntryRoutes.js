import { createEntry, getEntry, deleteEntry } from '../controller/Entry.js';
import { Router } from 'express';

const routerEntry = Router(); 

routerEntry.post('/entry', createEntry);
routerEntry.get('/entry', getEntry);
routerEntry.delete('/entry/:id', deleteEntry)

export default routerEntry