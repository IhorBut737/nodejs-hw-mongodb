import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post(
  '/contacts',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  ctrlWrapper(deleteContactByIdController),
);
contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactByIdController),
);

export default contactsRouter;
