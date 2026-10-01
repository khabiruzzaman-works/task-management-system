import { task_creation_service } from "../service/task_creation.service.js";

export async function task_creation_controller(req, res) {
  const { title, description, priority, status, manager } = req.body;

  const created_by = req.user._id;

  if (
    !title ||
    !description ||
    !priority ||
    !status ||
    !created_by ||
    !assigned_to
  ) {
    return res.status(405).json({
      message: "task data couldn't posted",
      success: false,
    });
  }

  try {
    const response = task_creation_service({
      title,
      description,
      priority,
      status,
      manager,
      created_by,
    });

    if (!response.ok) {
      return res.status(405).json({
        message: "task data couldn't posted",
        success: false,
      });
    }

    res.status(201).json({
      message: "task data posted",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || " couldn't create task",
      success: false,
    });
  }
}
