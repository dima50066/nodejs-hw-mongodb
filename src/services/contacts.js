import { ContactsCollection } from '../db/models/contacts.js';

export const getContacts = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    throw error; // Прокидуємо помилку далі
  }
};

export const getContactsById = async (id) => {
  try {
    const contact = await ContactsCollection.findById(id);
    return contact; // Повертаємо contact, навіть якщо він null
  } catch (error) {
    throw error; // Прокидуємо помилку далі
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

  if (!contact) return null;

  return {
    contact: contact.value,
    isNew: Boolean(!contact.lastErrorObject.upserted),
  };
};
