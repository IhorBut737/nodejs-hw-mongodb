import { Contacts } from '../db/models/contactsModel.js';

export const getAllContacts = async () => {
  const contacts = await Contacts.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contacts.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  return Contacts.create(payload);
};

export const deleteContact = async (contactId) => {
  return Contacts.findByIdAndDelete(contactId);
};

export const updateContact = async (contactId, payload) => {
  return Contacts.findByIdAndUpdate(contactId, payload, {
    new: true,
    runValidators: true,
  });
};
