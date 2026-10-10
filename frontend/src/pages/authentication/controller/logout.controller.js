import { logout_service } from "../service/logout.service.js";

export async function logout_controller() {
  try {
    const data = await logout_service();

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
