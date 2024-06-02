import {
    getContacts,
    addContact,
    getContactById,
    removeContact,
    updateContacts,
    updateStatusContact
} from "../services/contactsServices.js";
import { isValidObjectId } from "mongoose";

export const getAllContacts = async (req, res) => {
    try {
        const allContacts = await getContacts();
        res.json({ status: 'success', code: 200, data: allContacts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    try {

        const contact = await getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json({ status: 'success', code: 200, data: contact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    try {

        const removedContact = await removeContact(id);
        if (!removedContact) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.json({ status: 'success', code: 200, data: removedContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, favorite } = req.body;
        const newContact = await addContact(name, email, phone, favorite);
        res.status(201).json({ status: 'success', code: 201, data: newContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    try {

        const { name, email, phone, favorite } = req.body;

        if (!name && !email && !phone && favorite === undefined) {
            return res.status(400).json({ message: "Body must have at least one field" });
        }

        const updatedContact = await updateContacts(id, req.body);
        if (!updatedContact) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.status(200).json({ status: 'success', code: 200, data: updatedContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateFavoriteStatus = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    try {


        if (favorite === undefined) {
            return res.status(400).json({ message: "Missing field favorite" });
        }

        const updatedContact = await updateStatusContact(id, favorite);
        if (!updatedContact) {
            return res.status(404).json({ message: "Not Found" });
        }

        res.status(200).json({ status: 'success', code: 200, data: updatedContact });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
