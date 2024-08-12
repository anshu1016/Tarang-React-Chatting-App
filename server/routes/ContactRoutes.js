import { Router } from "express"; 
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { SearchContacts } from "../controllers/ContactsController.js";

const contactsRoutes = Router();

contactsRoutes.post("/search",verifyToken,SearchContacts)

export default contactsRoutes;