import { Router } from "express";
import { logout_controller } from "../controller/logout.controller.js";
import { authentify } from "../../../middleware/auth.middleware.js";

const route = Router();

route.get("/logout", authentify, logout_controller);

export default route;
