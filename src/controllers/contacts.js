import createHttpError from 'http-errors';
import { createContact, deleteContact, getAllContacts, getContactById, updateContact } from "../services/contacts.js";
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId
    });

    res.json({
        status: 200,
        message: "Successfully found contacts!",
        data: contacts,
    });
};


export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await getContactById(contactId, userId);

    if (!contact) {
        throw createHttpError(404, "Contact not found");
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};


export const createContactController = async (req, res, next) => {
    const contact = await createContact({
        ...req.body,
        userId: req.user._id,
    });

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data: contact,
    });
};


export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const result = await updateContact(contactId, userId, req.body);

    if (!result) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a contact!",
        data: result,
    });
};


export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;

    const contact = await deleteContact(contactId, userId);

    if (!contact) {
        next(createHttpError(404, "Contact not found"));
        return;
    }

    res.status(204).send();
};
