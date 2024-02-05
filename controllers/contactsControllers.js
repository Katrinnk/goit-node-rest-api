const controllerWrapper = require("../helpers/controllerWrapper");

const HttpError = require("../helpers/HttpError");

const Contact = require("../models/contacts");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(200).json(result);
};

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  if (!req.body || Object.keys(req.body).length === 0) {
    throw HttpError(400, "No request body!");
  }
  const result = await Contact.findByIdAndUpdate(
    id,
    req.body
  );
  if (!result) {
    throw HttpError(404, "Contact not found!");
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
