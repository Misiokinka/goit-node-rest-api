import Contact from "../models/contacts.js";

export async function getContacts() {
    try {
        return await Contact.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getContactById(contactId) {
    try {
        const contact = await Contact.findById(contactId);
        return contact ? contact : null;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function removeContact(contactId) {
    try {
        const contact = await Contact.findByIdAndDelete(contactId);
        return contact ? contact : null;
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
        return await Contact.create(newContact);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateContacts(id, data) {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(id, data, { new: true });
        return updatedContact ? updatedContact : null;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateStatusContact(contactId, favorite) {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            contactId,
            { favorite },
            { new: true }
        );
        return updatedContact ? updatedContact : null;
    } catch (error) {
        throw new Error(error.message);
    }
}
