/**
 * @internal
 * @packageDocumentation
 */
import { Router } from "express";
import EntryController from "../controllers/EntryController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

//Get all entries
router.get("/", [checkJwt], EntryController.listAll);

router.get("/by_id", [checkJwt], EntryController.getOneById);

router.get("/by_website", [checkJwt], EntryController.getAllByWebsite);

//Create a new entry
router.post("/", [checkJwt], EntryController.newEntry);

//Edit one entry
router.patch("/", [checkJwt], EntryController.editEntry);

//Delete one entry
router.delete("/", [checkJwt], EntryController.deleteEntry);

//Generate new password
router.get("/new_password", EntryController.newPassword);
router.post("/new_password", EntryController.newPassword);

export default router;