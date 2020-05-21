import { Router } from "express";
import auth from "./auth";
import user from "./user";
import entry from "./entry";

const routes = Router();

routes.use("/auth", auth);
routes.use("/user", user);
routes.use("/entry", entry);

export default routes;
