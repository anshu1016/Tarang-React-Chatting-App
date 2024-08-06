import { Router } from "express"; 
import { Signup } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post("/signup",Signup);

export default authRoutes;