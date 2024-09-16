import { StudentsCollection } from '../db/models/students.js';

export const getContacts = async () => {
  try {
    const contacts = await StudentsCollection.find().toArray();
    return contacts;
  } catch (error) {
    console.log('Error: fetching contacts', error);
  }
};
