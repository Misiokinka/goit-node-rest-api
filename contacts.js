import * as fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
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

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  let newContactItems = {
    name: name,
    email: email,
    phone: phone,
    id: nanoid(),
  };
  contacts.push(newContactItems);
  await writeContacts(contacts);

  return newContactItems;
}
