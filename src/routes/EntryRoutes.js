import { createEntry, getEntry, deleteEntry, editEntry } from '../controller/Entry.js';
import { Router } from 'express';
import { validateSchema } from '../middleware/validateSchema.js'
import { entrySchema } from '../model/EntryModel.js';

const routerEntry = Router(); 

routerEntry.post('/entry', validateSchema(entrySchema), createEntry);
routerEntry.get('/entry', getEntry);
routerEntry.delete('/entry/:id', deleteEntry);
routerEntry.put('/entry/:id', validateSchema(entrySchema), editEntry)

export default routerEntry