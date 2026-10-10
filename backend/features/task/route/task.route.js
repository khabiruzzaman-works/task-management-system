import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.middleware.js";
import { task_creation_controller } from "../controller/task_creation.controller.js";
import get_tasks_controller from "../controller/get_tasks.controller.js";
import managerify from "../../../middleware/managerify.middleware.js";
import task_change_as_manager_controller from "../controller/task_change_as_manager.controller.js";
import workerify from "../../../middleware/workerify.middleware.js";
import task_change_as_worker_controller from "../controller/task_change_as_worker.controller.js";
import task_change_as_admin_controller from "../controller/task_change_as_admin.controller.js";

const route = Router();

route.post("/create-task", authentify, adminify, task_creation_controller);
route.get("/get-tasks", authentify, get_tasks_controller);

route.patch("/task-manager", authentify, managerify, task_change_as_manager_controller);
route.patch("/task-worker", authentify, workerify, task_change_as_worker_controller);
route.patch("/task-admin" , authentify,adminify,task_change_as_admin_controller)


export default route;
