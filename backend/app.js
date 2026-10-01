import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import login_route from "./features/user/route/login.route.js";
import register_route from "./features/user/route/register.route.js";
import refresh_tokens_route from "./features/user/route/refresh_tokens.route.js";
import logout_route from "./features/user/route/logout.route.js";
import pass_change_route from "./features/user/route/pass_change.route.js";
import get_me_route from "./features/user/route/get_me.route.js";
import task_create_route from "./features/task/route/task.route.js";
import promotion_route from "./features/user/route/promotion.route.js";
import demotion_route from "./features/user/route/demotion.route.js";
import get_employee_list_route from "./features/user/route/get_employee_list.route.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors(corsOptions));

app.use("/api/user", login_route); // the route is "http://localhost:3000/api/user/login"
app.use("/api/user/admin", register_route); // the route is "http://localhost:3000/api/user/admin/register_worker"
app.use("/api/user", refresh_tokens_route); // the route is "http://localhost:3000/api/user/refresh-tokens"
app.use("/api/user", logout_route); // the route is "http://localhost:3000/api/user/logout"
app.use("/api/user", pass_change_route); // the route is "http://localhost:3000/api/user/change-pass"
app.use("/api/user", get_me_route); // the route is "http://localhost:3000/api/user/get-me"
app.use("/api/user/admin", task_create_route); // the route is "http://localhost:3000/api/user/admin/"
app.use("/api/user/admin", promotion_route); // the route is "http://localhost:3000/api/user/admin/promote"
app.use("/api/user/admin", demotion_route); // the route is "http://localhost:3000/api/user/admin/demote"
app.use("/api/user/admin", get_employee_list_route); // the route is "http://localhost:3000/api/user/admin/get-employee-list"
export default app;
