import { Router } from "express";
import login_controller from "../controller/login.controller.js";
const route = Router();

route.post("/login", login_controller);

export default route;
