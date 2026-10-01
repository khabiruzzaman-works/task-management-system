import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import { pass_change_controller } from "../controller/pass_change.controller.js";

const route = Router();

route.patch("/change-pass", authentify, pass_change_controller);

export default route;
