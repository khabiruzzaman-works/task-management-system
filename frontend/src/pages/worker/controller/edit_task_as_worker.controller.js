import { edit_task_as_worker_service } from "../service/edit_task_as_worker.service.js";

export async function edit_task_as_worker_controller(form, ) {
  try {
    const data = await edit_task_as_worker_service(form, );

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
