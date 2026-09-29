import { Router } from "express";
import { register_controller } from "../controller/register.controller.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import { authentify } from "../../../middleware/auth.middleware.js";

const route = Router();

route.post("/register_worker", authentify, adminify, register_controller);

export default route;
