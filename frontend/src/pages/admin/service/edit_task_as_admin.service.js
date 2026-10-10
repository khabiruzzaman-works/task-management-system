import fetch_handler from "../../../utils/fetch_handler.js";
export async function edit_task_as_admin_service(form, ) {
  return await fetch_handler("task/task-admin", {
    method: "PATCH",
    body: JSON.stringify(form),
  });
}
