import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");


export default async function listContacts() {
    const data = await fs.readFile(contactsPath, { encoding: "utf8" });

    return JSON.parse(data);
}
async function writeContacts(contacts) {
    await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}
export async function getContactById(contactId) {
    const contacts = await listContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (typeof contact === "undefined") {
        return null;
    }
    return contact;
}

export async function getContacts() {
    return await listContacts();
}

export async function removeContact(contactId) {
    const contacts = await listContacts();

    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }

    const removedContact = contacts[index];

    contacts.splice(index, 1);

    await writeContacts(contacts);

    return removedContact;
}

export async function addContact(newContact) {
    const contacts = await listContacts();

    let newContactItems = {
        id: nanoid(),
        ...newContact,

    };

    contacts.push(newContactItems);
    await writeContacts(contacts);

    return newContactItems;
}

export async function updateContacts(id, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }
    contacts[index] = {
        ...contacts[index],
        name: data.name || contacts[index].name,
        email: data.email || contacts[index].email,
        phone: data.phone || contacts[index].phone,
    };
    await writeContacts(contacts);
    return contacts[index];
}