import { Router } from "express";
import EntryController from "../controllers/EntryController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all entries
router.get("/", [checkJwt], EntryController.listAll);

// Get one entry
router.get("/:id([0-9]+)", [checkJwt], EntryController.getOneById);

//Create a new entry
router.post("/", [checkJwt], EntryController.newEntry);

//Edit one entry
router.patch("/:id([0-9]+)", [checkJwt], EntryController.editEntry);

//Delete one entry
router.delete("/:id([0-9]+)", [checkJwt], EntryController.deleteEntry);

//Generate new password
router.get("/new_password", EntryController.newPassword);

export default router;