import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const sortOptions = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const contactsQuery = ContactsCollection.find({ ...filter, userId })
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.countDocuments({ ...filter, userId }),
    contactsQuery.exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactsById = async (id, userId) => {
  try {
    const contact = await ContactsCollection.findOne({ _id: id, userId });
    return contact;
  } catch (error) {
    console.log('Error: fetching contacts with ID ${id}', error);
  }
};

export const createContact = async (payload, userId) => {
  const contact = await ContactsCollection.create({ ...payload, userId });
  return contact;
};

export const deleteContact = async (id, userId) => {
  const contact = await ContactsCollection.findByIdAndDelete({
    _id: id,
    userId,
  });
  return contact;
};

export const updateContact = async (id, payload, options, userId) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: id, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!contact || !contact.value) return null;

  return {
    contact: contact.value,
    isNew: Boolean(!contact.lastErrorObject.upserted),
  };
};
