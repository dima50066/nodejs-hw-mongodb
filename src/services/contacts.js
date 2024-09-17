import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
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
    const contact = await ContactsCollection.findById({ id });
    return contact;
  } catch (error) {
    console.log('Error: fetching contacts with ID ${id}', error);
  }
};
