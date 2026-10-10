import { login_service } from "../service/login.service.js";

export async function login_controller(form_data) {
  try {
    const data = await login_service(form_data);

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
