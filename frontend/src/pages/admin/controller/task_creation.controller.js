import { task_creation_service } from "../service/task_creation.service.js";

export async function task_creation_controller(task_form, access_token) {
  try {
    const data = await task_creation_service(task_form, access_token);

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}
