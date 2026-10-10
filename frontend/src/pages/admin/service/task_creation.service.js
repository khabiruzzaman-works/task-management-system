import fetch_handler from "../../../utils/fetch_handler.js";
export async function task_creation_service(task_form) {
  return await fetch_handler("task/create-task", {
    method: "POST",
    body: JSON.stringify(task_form),
  });
}
