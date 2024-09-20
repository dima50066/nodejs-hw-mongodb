import {
  getContacts,
  getContactsById,
  createContact,
  deleteContact,
  updateContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

import { parseSortParams } from '../utils/parseSortParams.js';

import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);

  const { sortBy, sortOrder } = parseSortParams(req.query);

  const filter = parseFilterParams(req.query);

  const contacts = await getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: 'Contacts fetched successfully',
    data: contacts.data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await getContactsById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Contact fetched successfully',
    data: contact,
  });
};

export const createContactController = async (req, res, next) => {
  const contact = await createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;

  const contact = await deleteContact(id);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  res.status(204).send();
};

export const upsertContactController = async (req, res, next) => {
  const { id } = req.params;
  const result = await updateContact(id, req.body, { upsert: true });

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }
  const status = result.isNew ? 201 : 200;
  res.status(status).json({
    status,
    message: 'Contact upserted successfully',
    data: result.contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { id } = req.params;

  const result = await updateContact(id, req.body);

  if (!contact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Contact patched successfully',
    data: result.contact,
  });
};
