const { nanoid } = require("nanoid");

const fs = require("node:fs/promises");
const path = require("path");

const contactsPath = path.join(
  __dirname,
  "..",
  "db",
  "contacts.json"
);

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const contacts = await listContacts();
  return (
    contacts.find((contact) => contact.id === id) || null
  );
};

const removeContact = async (id) => {
  const contacts = await listContacts();

  const index = contacts.findIndex(
    (contact) => contact.id === id
  );

  if (index !== -1) {
    const removedContact = contacts.splice(index, 1);
    await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts, null, 2)
    );
    return removedContact;
  } else return null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name: name,
    email: email,
    phone: phone,
  };
  contacts.push(newContact);
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );

  return newContact;
};

const updateContactById = async (
  id,
  name,
  email,
  phone
) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id === id
  );
  if (index === -1) return null;
  contacts[index] = { id, name, email, phone };
  await fs.writeFile(
    contactsPath,
    JSON.stringify(contacts, null, 2)
  );
  return contacts[index];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
};
