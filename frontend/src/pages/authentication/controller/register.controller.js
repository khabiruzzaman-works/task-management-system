import { register_worker_service } from "../service/register.service.js";

export async function register_worker_controller(form_data, token) {
  try {
    const data = await register_worker_service(form_data, token);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}
