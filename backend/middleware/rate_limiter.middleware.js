import rate_limiter from "express-rate-limit";

function limiter(time, count, message, code) {
  return rate_limiter({
    windowMs: time * 60 * 1000,
    limit: count,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: function (req, res) {
      res.status(429).json({ message, code, success: false });
    },
  });
}

export function global_limit() {
  return limiter({
    time: 10,
    count: 200,
    message: "too many request",
    code: "RATE_LIMIT",
  });
}
export function login_limit() {
  return limiter({
    time: 10,
    count: 10,
    message: "too many request",
    code: "RATE_LIMIT",
  });
}
export function register_limit() {
  return limiter({
    time: 10,
    count: 5,
    message: "too many request",
    code: "RATE_LIMIT",
  });
}
export function pass_change_limit() {
  return limiter({
    time: 10,
    count: 1,
    message: "too many request",
    code: "RATE_LIMIT",
  });
}
