const controllerWrapper = require("../helpers/controllerWrapper");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("../services/contactsServices");
const HttpError = require("../helpers/HttpError");

const getAllContacts = async (req, res, next) => {
  const result = await listContacts();
  console.log("result", result);
  res.status(200).json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const { name, email, phone } = req.body;
  const result = await addContact(name, email, phone);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await updateContactById(
    id,
    name,
    email,
    phone
  );
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getOneContact: controllerWrapper(getOneContact),
  deleteContact: controllerWrapper(deleteContact),
  createContact: controllerWrapper(createContact),
  updateContact: controllerWrapper(updateContact),
};
