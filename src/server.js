import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { env } from './utils/env.js';
import { getContacts } from './services/contacts.js';
import { getContactsById } from './services/contacts.js';

dotenv.config();

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getContacts();
    console.log(contacts);

    res.status(200).json({ data: contacts });
  });

  app.get('/contacts/:id', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContactsById(contactId);
    if (!contact) {
      res.status(404).json({
        message: 'Not found',
      });
    } else {
      res.status(200).json({ data: contact });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
};
