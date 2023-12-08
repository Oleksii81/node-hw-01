import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const readContacts = async() => {
    try {
        const data = await fs.readFile(contactsPath);
        return JSON.parse(data);
    }
    catch(error) {
        console.error(error.message);
    }
}

export const writeContacts = async(contacts) => {
    try {
        await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
    }
    catch {
        console.error(error.message);
    }
}

export const listContacts = async() => {
    try {
        const contacts = await readContacts();
        return contacts;
    }
    catch {
        console.error(error.message);
    }
}

export const getContactById = async(id) => {
        const contacts = await readContacts();
        const result = contacts.find(contact => contact.id === id);
        return result || null
}

export const removeContact = async(id) => {
    try {
        const contacts = await readContacts();
        const index = contacts.findIndex(contact => contact.id === id);
        if (index === -1) {
            return null;
        }
        const [result] = contacts.splice(index, 1);
        await writeContacts(contacts);
        return result;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

export const addContact = async(name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    }
    contacts.push(newContact);
    await writeContacts(contacts);
    return newContact;
}