import { Router } from "express";
import { createContactController, deleteContactController, getContactByIdController, getContactsController, patchContactController } from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createContactSchema, patchContactSchema } from "../validation/contacts.js";
import { isValidId } from "../middlewares/isValidId.js";

const router = Router();


router.get("/contacts", ctrlWrapper(getContactsController));

router.get("/contacts/:contactId", isValidId, ctrlWrapper(getContactByIdController));

router.post("/contacts", validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch("/contacts/:contactId", isValidId, validateBody(patchContactSchema), ctrlWrapper(patchContactController));

router.delete("/contacts/:contactId", isValidId, ctrlWrapper(deleteContactController));

export default router;
