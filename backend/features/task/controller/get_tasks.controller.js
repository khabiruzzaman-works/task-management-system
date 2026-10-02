import get_tasks_service from "../service/get_tasks.service.js";


export default async function get_tasks_controller(req, res) {
  const user_id = req.user._id;
  try {
    const tasks = await get_tasks_service(user_id);

    res.status(201).json({
      message: "tasks is fetched from db",
      success: true,
      tasks,
    })

  } catch (error) {
    return res.status(500).json({
      message: error.message || " couldn't create task",
      success: false,
    })
  }
}
