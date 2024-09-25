import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import {
  getContactsController,
  getContactByIdController,
} from './controllers/contacts.js';

const PORT = process.env.PORT || 3000;

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Contacts API' });
  });

  app.get('/contacts', getContactsController);

  app.get('/contacts/:contactId', getContactByIdController);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
