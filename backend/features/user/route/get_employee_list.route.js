import { Router } from "express";
import { authentify } from "../../../middleware/auth.middleware.js";
import adminify from "../../../middleware/adminify.mddleware.js";
import get_employee_list_controller from "../controller/get_employee.controller.js";

const route = Router();

route.get(
  "/get-employee-list",
  authentify,
  adminify,
  get_employee_list_controller,
);

export default route;
