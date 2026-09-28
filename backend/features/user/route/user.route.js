import { Router } from "express";
import adminify from "../../../middleware/adminify.mddleware.js";
import { authentify } from "../../../middleware/auth.middleware.js";
import { register_controller } from "../controller/register.controller.js";
import { refresh_token_controller } from "../controller/refresh_tokens.controller.js";
import { logout_controller } from "../controller/logout.controller.js";
import { get_me_controller } from "../controller/get_me.controller.js";
import login_controller from "../controller/login.controller.js";

const route = Router();

route.post("/create_user", authentify, adminify, register_controller);
route.get("/refresh-tokens", refresh_token_controller);
route.get("/logout", authentify, logout_controller);
route.post("/login", login_controller);
route.get("/get-me", authentify, get_me_controller);

export default route;
