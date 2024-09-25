import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    console.log('Fetching contacts', contacts);

    if (!contacts || contacts.length === 0) {
      return {
        status: 404,
        message: 'No contacts found',
        data: [],
      };
    }

    return {
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    };
  } catch (error) {
    console.log('Error: fetching contacts', error);
    throw {
      status: 500,
      message: 'Error fetching contacts',
      error,
    };
  }
};

export const getContactsById = async (id) => {
  try {
    const contact = await ContactsCollection.findById(id);

    if (!contact) {
      return {
        status: 404,
        message: `Contact with id ${id} not found`,
        data: null,
      };
    }

    return {
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    };
  } catch (error) {
    console.log(`Error: fetching contact with ID ${id}`, error);
    throw {
      status: 500,
      message: `Error fetching contact with id ${id}`,
      error,
    };
  }
};
