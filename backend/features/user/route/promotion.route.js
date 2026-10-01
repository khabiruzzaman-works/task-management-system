import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import promotion_controller from "../controller/promotion.controller.js";

const route = Router();

route.patch("/promote", authentify, adminify, promotion_controller);

export default route;
