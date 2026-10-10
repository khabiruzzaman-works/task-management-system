import fetch_handler from "../../../utils/fetch_handler.js";
export default async function promotion_service(worker_email, ) {
  return await fetch_handler("user/admin/promote", {
    method: "PATCH",
    body: JSON.stringify({ worker_email }),
  });
}
