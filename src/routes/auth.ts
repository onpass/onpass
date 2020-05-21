import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();
//Login route
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.post("/check", AuthController.check);
router.get("/check", AuthController.check);

export default router;