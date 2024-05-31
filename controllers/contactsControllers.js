import getContacts, { addContact, getContactById, removeContact, updateContacts } from "../services/contactsServices.js";


export const getAllContacts = async (req, res) => {
    try {
        const allContacts = await getContacts()

        res.status(200).json(allContacts);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getOneContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contactById = await getContactById(id);

        if (!contactById) {
            return res.status(404).send({ "message": "Not found" });
        }
        res.status(200).json(contactById);

    }
    catch {
        (error) => {

            res.status(404).json({ "message": "Not found" });
        }
    }
}

export const deleteContact = async (req, res) => {

    try {
        const { id } = req.params;
        const removeContactById = await removeContact(id);
        if (removeContactById) {
            res.status(200).json(removeContactById);
        } else {
            res.status(404).json({ message: "Not found" });
        }

    }
    catch {
        () => {

            res.status(404).json({ message: "Not found" });
        }
    }
};

export const createContact = async (req, res) => {
    try {

        const addNewContact = await addContact(req.body);
        res.status(200).json(addNewContact);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
};


export const updateContact = async (req, res) => {

    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        if (!name && !email && !phone) {
            return res.status(400).json({ message: "Body must have at least one field" });
        }

        const updatedContact = await updateContacts(id, { name, email, phone });

        if (!updatedContact) {
            return res.status(404).json({ message: "Not Found" });
        }
        res.status(200).json(updatedContact);
    } catch (error) {

        res.status(400).json({ message: error.message });
    }


}
