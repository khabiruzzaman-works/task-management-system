import rate_limiter, { ipKeyGenerator } from "express-rate-limit";

function limiter({ time, count, message, code, ...additionals }) {
  return rate_limiter({
    windowMs: time * 60 * 1000,
    limit: count,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    handler: function (req, res) {
      res.status(429).json({ message, code, success: false });
    },
    ...additionals,
  });
}

export function global_limit() {
  return limiter({
    time: 10,
    count: 1000,
    message: "too many requests",
    code: "RATE_LIMIT",
  });
}
export function login_limit() {
  return limiter({
    time: 10,
    count: 10,
    message: "too many requests",
    code: "RATE_LIMIT",
    skipSuccessfulRequests: true,
    keyGenerator: function (req) {
      const email = String(req.body?.email ?? "")
        .trim()
        .toLowerCase();
      return `${ipKeyGenerator(req.ip)}|${email}`;
    },
  });
}
export function register_limit() {
  return limiter({
    time: 10,
    count: 10,
    message: "too many requests",
    code: "RATE_LIMIT",
    keyGenerator: function (req) {
      return req?.user?._id.toString();
    },
  });
}
export function pass_change_limit() {
  return limiter({
    time: 10,
    count: 5,
    message: "too many requests",
    code: "RATE_LIMIT",
    keyGenerator: function (req) {
      return req?.user?._id.toString();
    },
  });
}
