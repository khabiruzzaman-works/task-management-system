import jsonwebtoken from "jsonwebtoken";
import variables from "../config/env_variables.js";

export function access_token_generator(id) {
  if (!(variables.ACCESS_TOKEN_EXPIRY && variables.ACCESS_TOKEN_SECRET_KEY)) {
    const error = new Error("env variable is undefined");
    error.status = 500;
    error.success = false;

    throw error;
  }
  const token = jsonwebtoken.sign(
    {
      _id: id,
    },
    variables.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: variables.ACCESS_TOKEN_EXPIRY },
  );
  return token;
}
export function refresh_token_generator({ name, email, id }) {
  if (!(variables.REFRESH_TOKEN_EXPIRY && variables.REFRESH_TOKEN_SECRET_KEY)) {
    const error = new Error("env variable is undefined");
    error.status = 500;
    error.success = false;

    throw error;
  }
  const token = jsonwebtoken.sign(
    {
      _id: id,
      name,
      email,
    },
    variables.REFRESH_TOKEN_SECRET_KEY,
    { expiresIn: variables.REFRESH_TOKEN_EXPIRY },
  );
  return token;
}

export function token_generator(payload, token_name) {
  const is_access_token = token_name === "access";

  const expiry = is_access_token
    ? variables.ACCESS_TOKEN_EXPIRY
    : variables.REFRESH_TOKEN_EXPIRY;
  const secret = is_access_token
    ? variables.ACCESS_TOKEN_SECRET_KEY
    : variables.REFRESH_TOKEN_SECRET_KEY;

  if (!expiry || !secret) {
    const error = new Error("env variable is undefined");
    error.status = 500;
    error.success = false;

    throw error;
  }
  const token = jsonwebtoken.sign(
    {
      ...payload,
    },
    secret,
    { expiresIn: expiry },
  );
  return token;
}
