import { Router } from "express";
import { refresh_token_controller } from "../controller/refresh_tokens.controller.js";

const route = Router();

route.get("/refresh-tokens", refresh_token_controller);
export default route;
