const express = require("express");
const {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
} = require("../controllers/contactsControllers.js");

const contactsRouter = express.Router();

const validateBody = require("../helpers/validateBody");
const {
  updateBookFavoriteShema,
} = require("../schemas/contactsSchemas");

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", createContact);

contactsRouter.put("/:id", updateContact);

contactsRouter.put(
  "/favorite/:id",
  validateBody(updateBookFavoriteShema),
  updateContact
);

module.exports = contactsRouter;
