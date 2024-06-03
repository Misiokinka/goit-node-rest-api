import Contact from "../models/contacts.js";

export async function listContacts() {
    try {

        const data = await Contact.find();

        return data


    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getContactById(contactId) {
    try {
        const contact = await Contact.findById(contactId);
        if (contact === null) {
            return null;
        }
        return contact;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function removeContact(contactId) {
    try {
        const contact = await Contact.findByIdAndDelete(contactId);
        if (contact === null) {
            return null;
        }
        return contact;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function addContact(name, email, phone, favorite = false) {
    const newContact = {
        name,
        email,
        phone,
        favorite,
    };
    try {
        const contact = await Contact.create(newContact);
        return contact;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateContacts(contactId, data) {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(contactId, data, { new: true });
        if (updatedContact === null) {
            return null;
        }

    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateStatusContact(contactId, favorite) {
    try {
        const results = updateContacts(contactId, { favorite });
        if (results == null) {
            return null
        }
        return results;


    } catch (error) {
        throw new Error(error.message);
    }
}
