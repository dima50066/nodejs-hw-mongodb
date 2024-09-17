import { getContacts, getContactsById } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
  try {
    const contacts = await getContacts();

    res.json({
      status: 200,
      message: 'Contacts fetched successfully',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await getContactsById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  req.json({
    status: 200,
    message: 'Contact fetched successfully',
    data: contact,
  });
};
