import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import { task_creation_controller } from "../controller/task_creation.controller.js";
import get_tasks_controller from "../controller/get_tasks.controller.js";

const route = Router();


route.post("/create-task", authentify, adminify, task_creation_controller);
route.get("/get-tasks", authentify, get_tasks_controller);

export default route;
