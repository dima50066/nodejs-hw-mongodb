import { StudentsCollection } from '../db/models/students.js';

export const getContacts = async () => {
  try {
    const contacts = await StudentsCollection.find();
    return contacts;
  } catch (error) {
    console.log('Error: fetching contacts', error);
  }
};

export const getContactsById = async (id) => {
  try {
    const contact = await StudentsCollection.findById({ _id: id });
    return contact;
  } catch (error) {
    console.log('Error: fetching contacts', error);
  }
};
