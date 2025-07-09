import { SORT_ORDER } from '../constants/index.js';
import { Contacts } from '../db/models/contactsModel.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contacts.find({ userId });

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const contactsCount = await Contacts.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contacts.findById({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  return Contacts.create(payload);
};

export const deleteContact = async (contactId, userId) => {
  return Contacts.findOneAndDelete({
    _id: contactId,
    userId,
  });
};

export const updateContact = async (contactId, payload, userId) => {
  return Contacts.findOneAndUpdate({ _id: contactId, userId }, payload, {
    new: true,
    runValidators: true,
  });
};
