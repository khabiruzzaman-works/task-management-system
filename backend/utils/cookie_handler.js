import variables from "../config/env_variables.js";

const is_prod = variables.NODE_ENV === "production";
export  const cookie_options = {
  httpOnly: true,
  secure: is_prod,
  sameSite: is_prod ? "none" : "lax",
  maxAge: 15 * 24 * 60 * 60 * 1000,
};
