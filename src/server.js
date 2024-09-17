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
    try {
      const contacts = await getContacts();
      res.status(200).json({ data: contacts });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts', error });
    }
  });

  app.get('/contacts/:id', async (req, res) => {
    const { id } = req.params;

    try {
      const contact = await getContactsById(id);
      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
      } else {
        res.status(200).json({ data: contact });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: 'Error fetching contact by ID ${id}', error });
    }
  });

  app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });
};
