import { createEntry, getEntry, deleteEntry, editEntry } from '../controller/Entry.js';
import { Router } from 'express';
import { validateSchema } from '../middleware/validateSchema.js';
import { entrySchema } from '../model/EntryModel.js';
import { entryCreateValidation } from '../middleware/EntryCreateValidation.js';
import { entryEditValidation } from '../middleware/EntryEditValidation.js';

const routerEntry = Router(); 

routerEntry.post('/entry', entryCreateValidation, validateSchema(entrySchema), createEntry);
routerEntry.get('/entry', getEntry);
routerEntry.delete('/entry/:id', deleteEntry);
routerEntry.put('/entry/:id', entryEditValidation, validateSchema(entrySchema), editEntry);

export default routerEntry;