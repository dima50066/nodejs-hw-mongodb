import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = async () => {
  return await ContactsCollection.find();
};

export const getContactsById = async (id) => {
  return await ContactsCollection.findById(id);
};
