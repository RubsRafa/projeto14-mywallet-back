import { createEntry, getEntry, deleteEntry, editEntry } from '../controller/Entry.js';
import { Router } from 'express';

const routerEntry = Router(); 

routerEntry.post('/entry', createEntry);
routerEntry.get('/entry', getEntry);
routerEntry.delete('/entry/:id', deleteEntry);
routerEntry.put('/entry/:id', editEntry)

export default routerEntry