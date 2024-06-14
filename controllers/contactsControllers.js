import Contact from "../models/contacts.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../helpers/ctrlWrapper.js";
import { isValidObjectId } from "mongoose";

export const getAllContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const numericLimit = parseInt(limit, 10);
    const skip = (page - 1) * numericLimit;

    const data = await Contact.find({ owner })
        .skip(skip)
        .limit(numericLimit)
        .populate("owner", "email subscription");
    res.json(data);
};

export const getOneContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    const data = await Contact.findById(id);
    if (!data) {
        throw HttpError(404, "Not Found");
    }
    if (data.owner.toString() !== req.user.id) {
        return res.status(404).send({ message: "Contact not found" });
    }
    res.json(data);
};

export const deleteContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    const contact = await Contact.findById(id);

    if (contact.owner.toString() !== req.user.id) {
        return res.status(404).send({ message: "Contact not found" });
    }
    const data = await Contact.findByIdAndDelete(id);
    if (!data) {
        throw HttpError(404, "Not Found");
    }

    res.json(data);
};

export const createContact = async (req, res) => {
    const { _id: owner } = req.user;
    const data = await Contact.create({ ...req.body, owner });
    res.status(201).json(data);
};

export const updateContact = async (req, res) => {
    const { id } = req.params;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    const contact = await Contact.findById(id);

    if (contact.owner.toString() !== req.user.id) {
        return res.status(404).send({ message: "Contact not found" });
    }
    const data = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!data) {
        throw HttpError(404, "Not Found");
    }

    res.status(200).json(data);
};

export const updateFavoriteStatus = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    if (!isValidObjectId(id)) {
        return res.status(404).json({ message: "This identifier is not valid" });
    }
    const contact = await Contact.findById(id);

    if (contact.owner.toString() !== req.user.id) {
        return res.status(404).send({ message: "Contact not found" });
    }
    const data = await Contact.findByIdAndUpdate(id, { favorite }, { new: true });
    if (!data) {
        throw HttpError(404, "Not Found");
    }

    res.status(200).json(data);
};

export default {
    getAllContacts: ctrlWrapper(getAllContacts),
    getOneContact: ctrlWrapper(getOneContact),
    deleteContact: ctrlWrapper(deleteContact),
    createContact: ctrlWrapper(createContact),
    updateContact: ctrlWrapper(updateContact),
    updateFavoriteStatus: ctrlWrapper(updateFavoriteStatus)
};
