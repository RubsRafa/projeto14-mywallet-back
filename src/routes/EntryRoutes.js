import { createEntry, getEntry, deleteEntry, editEntry } from '../controller/Entry.js';
import { Router } from 'express';
import { validateSchema } from '../middleware/validateSchema.js';
import { entrySchema } from '../model/EntryModel.js';
import { entryCreateValidation } from '../middleware/EntryCreateValidation.js';
import { entryEditValidation } from '../middleware/EntryEditValidation.js';
import { entryGetValidation } from '../middleware/EntryGetValidation.js';
import { entryDeleteValidation } from '../middleware/EntryDeleteValidation.js';

const routerEntry = Router(); 

routerEntry.post('/entry', entryCreateValidation, validateSchema(entrySchema), createEntry);
routerEntry.get('/entry', entryGetValidation, getEntry);
routerEntry.delete('/entry/:id', entryDeleteValidation, deleteEntry);
routerEntry.put('/entry/:id', entryEditValidation, validateSchema(entrySchema), editEntry);

export default routerEntry;