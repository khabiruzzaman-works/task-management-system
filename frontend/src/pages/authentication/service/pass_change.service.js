import fetch_handler from "../../../utils/fetch_handler.js";
export default async function pass_change_service(
  new_password,
  current_password,
) {
  return await fetch_handler("authentication/change-pass", {
    method: "PATCH",
    body: JSON.stringify({ new_password, current_password }),
  });
}
