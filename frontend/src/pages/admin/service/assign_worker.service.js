import fetch_handler from "../../../utils/fetch_handler.js";

export default async function assign_worker_service(
  worker_email,
  manager_email,
) {
  return await fetch_handler("user/admin/assign-worker", {
    method: "PATCH",
    body: JSON.stringify({ worker_email, manager_email }),
  });
}
