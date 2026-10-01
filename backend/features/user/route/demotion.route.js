import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import demotion_controller from "../controller/demotion.controller.js";

const route = Router();

route.patch("/demote", authentify, adminify, demotion_controller);

export default route;
