import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import login_route from "./features/user/route/login.route.js";
import register_route from "./features/user/route/register.route.js";
import refresh_tokens_route from "./features/user/route/refresh_tokens.route.js";
import logout_route from "./features/user/route/logout.route.js";
import get_me_route from "./features/user/route/get_me.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/user", login_route);
app.use("/api/user/admin", register_route);
app.use("/api/user", refresh_tokens_route);
app.use("/api/user", logout_route);
app.use("/api/user", get_me_route);
export default app;
