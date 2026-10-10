import fetch_handler from "../../../utils/fetch_handler.js";
export async function register_worker_service(form) {
  return await fetch_handler("authentication/register-user", {
    method: "POST",
    body: JSON.stringify(form),
  });
}
