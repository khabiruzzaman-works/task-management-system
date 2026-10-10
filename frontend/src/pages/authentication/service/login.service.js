import fetch_handler from "../../../utils/fetch_handler.js";
export async function login_service(form_data) {
  return await fetch_handler("authentication/login", {
    method: "POST",
    body: JSON.stringify(form_data),
  });
}
