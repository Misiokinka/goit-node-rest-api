
import { program } from "commander";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} from "./contacts.js";

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await listContacts();
      console.table(allContacts);
      break;
    case "get":
      const getContact = await getContactById(id);
      console.table(getContact);
      break;
    case "add":
      const newContact = await addContact(name, email, phone);
      console.table(newContact);
      break;
    case "remove":
      const removedContact = await removeContact(id);
      console.table(removedContact);
      break;
    default:
      console.warn(action);
      return "unknown action:-(";
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);


invokeAction(program.opts())