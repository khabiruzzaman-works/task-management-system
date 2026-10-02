import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import assign_worker_controller from "../controller/assign_worker.controller.js";

const route = Router()

route.patch("/assign-worker",authentify,adminify,assign_worker_controller)

export default route;
