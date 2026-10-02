import { Error } from "mongoose";
import User from "../model/user.model.js";

export default async function assign_worker_service(
  manager_email,
  worker_email,
) {
  const the_manager = await User.findOne({ email: manager_email }).select(
    "-password",
  );

  if (!the_manager) {
    const error = new Error();
    error.message = "couldn't get the manager's info";
    error.status = 404;
    error.success = false;
    return error;
  }

  const is_assigned = await User.findOneAndUpdate(
    { email: worker_email },
    { manager: the_manager._id },
    { returnDocument: "after" },
  );
  if (!is_assigned) {
    const error = new Error();
    error.message = "couldn't assign worker to a manager";
    error.status = 409;
    error.success = false;
    return error;
  }
}
