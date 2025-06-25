import { Router } from 'express';
import {
  createContactController,
  deleteContactByIdController,
  getContactByIdController,
  getContactsController,
  patchContactByIdController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getContactsController));
contactsRouter.get(
  '/contacts/:contactId',
  ctrlWrapper(getContactByIdController),
);
contactsRouter.post('/contacts', ctrlWrapper(createContactController));
contactsRouter.delete(
  '/contacts/:contactId',
  ctrlWrapper(deleteContactByIdController),
);
contactsRouter.patch(
  '/contacts/:contactId',
  ctrlWrapper(patchContactByIdController),
);

export default contactsRouter;
