import { logout_service } from "../service/logout.service.js";

export async function logout_controller(token) {
  try {
    const data = await logout_service(token);

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}
