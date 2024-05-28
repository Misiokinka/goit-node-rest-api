import getContacts, { addContact, getContactById, removeContact, updateContacts } from "../services/contactsServices.js";


export const getAllContacts = async (req, res) => {
    try {
        const allContacts = await getContacts()

        res.json({
            status: 'success',
            code: 200,
            data: allContacts,
        });
    }
    catch { }
}

export const getOneContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contactById = await getContactById(id);

        if (!contactById) {
            return res.status(404).send("Not Found");
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contactById },
        });

    }
    catch {
        (error) => {
            console.error("message:", error)
            res.status(404).send("Not Found");
        }
    }
}

export const deleteContact = async (req, res) => {

    try {
        const { id } = req.params;
        const removeContactById = await removeContact(id);

        if (!removeContactById) {
            return res.status(404).send("Not Found");
        }

        res.json({
            status: 'success',
            code: 200,

        });

    }
    catch {
        (error) => {

            console.error("message:", error)
            res.status(200).send("Product deleted");
        }
    }
};

export const createContact = async (req, res) => {
    try {

        const addNewContact = await addContact(req.body);

        res.status(201).json({
            status: 'success',
            code: 201,
            data: { addNewContact },
        })


    }
    catch {
        (error) => {
            res.status(400).json({ message: error.message });
        }
    }
};


export const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone } = req.body;

        if (name === undefined && email === undefined && phone === undefined) {
            res.status(400).json({ message: "Body must have at least one field" });
        } await updateContacts(id, req.body);

        const newContact = await getContactById(id)
        res.status(200).json(newContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }


}
