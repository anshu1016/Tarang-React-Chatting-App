import { Router } from "express"; 
import { login, Signup } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/signup",Signup);
authRoutes.post("/login",login);
export default authRoutes;