import { edit_task_as_manager_service } from "../service/edit_task_as_manager.service.js";

export async function edit_task_as_manager_controller(form, ) {
  try {
    const data = await edit_task_as_manager_service(form, );

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
