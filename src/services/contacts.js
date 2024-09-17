import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    console.log('Fetching contacts', contacts);

    if (!contacts || contacts.length === 0) {
      console.log('No contacts found');
    }
    return contacts;
  } catch (error) {
    console.log('Error: fetching contacts', error);
    throw error;
  }
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
      includeResultMetadatas: true,
      ...options,
    },
  );

  if (!contact || !contact.value) return null;

  return {
    contact: contact.value,
    isNew: Boolean(!contact.lastErrorObject.upserted),
  };
};
