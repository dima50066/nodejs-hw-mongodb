import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const sortOptions = {
    [sortBy]: sortOrder === 'asc' ? 1 : -1,
  };

  const [totalItems, contacts] = await Promise.all([
    ContactsCollection.countDocuments(filter),
    ContactsCollection.find(filter).sort(sortOptions).skip(skip).limit(limit),
  ]);

  const paginationData = calculatePaginationData(totalItems, perPage, page);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages: paginationData.totalPages,
    hasPreviousPage: paginationData.hasPreviousPage,
    hasNextPage: paginationData.hasNextPage,
  };
};

export const getContactsById = async (id) => {
  try {
    const contact = await ContactsCollection.findById(id);
    return contact;
  } catch (error) {
    console.log('Error: fetching contacts with ID ${id}', error);
  }
};

export const createContact = async (payload) => {
  const contact = await ContactsCollection.create(payload);
  return contact;
};

export const deleteContact = async (id) => {
  const contact = await ContactsCollection.findByIdAndDelete(id);
  return contact;
};

export const updateContact = async (id, payload, options) => {
  const contact = await ContactsCollection.findOneAndUpdate(
    { _id: id },
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
