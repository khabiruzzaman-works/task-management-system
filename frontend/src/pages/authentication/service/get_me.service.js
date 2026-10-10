import fetch_handler from "../../../utils/fetch_handler.js";
export async function get_me_service() {
  return await fetch_handler("authentication/get-me", {});
}
