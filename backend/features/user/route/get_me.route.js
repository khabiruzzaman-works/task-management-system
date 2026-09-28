import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import { get_me_controller } from "../controller/get_me.controller.js";

const route = Router();

route.get("/get-me", authentify, get_me_controller);

export default route;
