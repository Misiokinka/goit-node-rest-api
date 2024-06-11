import express from "express";
import contactsControllers from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, updateContactFavoriteSchema } from "../schemas/contactsSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../helpers/authenticate.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, contactsControllers.getAllContacts);

contactsRouter.get("/:id", authenticate, contactsControllers.getOneContact);

contactsRouter.delete("/:id", authenticate, contactsControllers.deleteContact);

contactsRouter.post("/", authenticate, validateBody(createContactSchema), contactsControllers.createContact);

contactsRouter.put("/:id", authenticate, validateBody(updateContactSchema), contactsControllers.updateContact);

contactsRouter.patch("/:id/favorite", authenticate, validateBody(updateContactFavoriteSchema), contactsControllers.updateFavoriteStatus);

export default contactsRouter;