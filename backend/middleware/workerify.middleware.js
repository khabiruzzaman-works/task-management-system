import { App_error } from "../utils/app_outcome_handler.js";

export default async function workerify(req, res, next) {
  if (req.user?.role !== "worker") {
    throw new App_error("worker only", 403, "FORBIDDEN");
  }
  next();
}
