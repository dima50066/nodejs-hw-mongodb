import { getContacts, getContactsById } from '../services/contacts.js';

export const getContactsController = async (req, res) => {
  try {
    const contacts = await getContacts();

    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ message: 'No contacts found' });
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactsById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error fetching contact with id ${contactId}` });
  }
};
