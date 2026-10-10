import { register_worker_service } from "../service/register.service.js";

export async function register_worker_controller(form,) {
  try {
    const data = await register_worker_service(form, );
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
