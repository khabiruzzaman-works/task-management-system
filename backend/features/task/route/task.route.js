import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import { task_creation_controller } from "../controller/task_creation.controller.js";

const route = Router();


route.post("/create", authentify, adminify, task_creation_controller);

export default route;
