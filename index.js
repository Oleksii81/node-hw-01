import * as contactService from "./contacts.js";
import {program} from "commander";
import { nanoid } from "nanoid";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
    switch(action) {
        case "list":
            const allContacts = await contactService.listContacts();
            console.table(allContacts);
            break;
        case "get":
            const contactById = await contactService.getContactById(id);
            console.log(`Search result:`, contactById);
            break;
        case "add":
            const addedContact = await contactService.addContact(
                name,
                email,
                phone,
                (id = nanoid())
            );
            console.log(`Contact was added:`, addedContact);
            break;
        case "remove":
            const removeContact = await contactService.removeContact(id);
            console.log(`Contact was removed`, removeContact);
            break;
        default:
            console.log(`Unknown action type! Available actions: list, get, add, remove`);
    }
}

invokeAction(argv);