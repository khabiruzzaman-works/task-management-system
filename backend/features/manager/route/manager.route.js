import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import managerify from "../../../middleware/managerify.middleware.js";
import get_worker_list_controller from "../controller/get_worker_list.controller.js";

const route = Router()


route.get("/get_worker-list", authentify, managerify, get_worker_list_controller);

export default route;
