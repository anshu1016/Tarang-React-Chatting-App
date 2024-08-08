import { Router } from "express"; 
import { getUserInfo, login, Signup } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

const authRoutes = Router();

authRoutes.post("/signup",Signup);
authRoutes.post("/login",login);
authRoutes.get("/user-info",verifyToken,getUserInfo)
export default authRoutes;