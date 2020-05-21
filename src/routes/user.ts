import { Router } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all users
router.get("/", UserController.listAll);

// Get one user
router.get("/by_id", UserController.getOneById);

//Create a new user
router.post("/", UserController.newUser);

//Edit one user
router.patch("/by_id", UserController.editUser);

//Delete one user
router.delete("/by_id", UserController.deleteUser);

//Check if user is logged in
router.get("/is", UserController.isLoggedIn);

export default router;