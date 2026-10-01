import Task from "../model/task.model.js";

export function task_creation_service({
  title,
  description,
  priority,
  status,
  manager,
  created_by,
}) {
  const new_task = new Task({
    title,
    description,
    priority,
    status,
    manager,
    created_by,
  });

  return new_task.save();
}
