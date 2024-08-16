import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactsForDMList, getMessages } from "../controllers/MessagesController.js";

const messagesRoutes = Router();
messagesRoutes.post("/get-messages",verifyToken,getMessages)
messagesRoutes.get("/get-contacts-for-dm",verifyToken,getContactsForDMList)
export default messagesRoutes;