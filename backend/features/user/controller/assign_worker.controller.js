import assign_worker_service from "../service/assign_worker.service.js";

export default async function assign_worker_controller(req, res) {
  const { manager_email, worker_email } = req.body;

  if (!manager_email || !worker_email) {
    return res.status(404).json({
      message: "manager' email or worker's email is not sent",
      success: false,
    });
  }

  try {
    await assign_worker_service(manager_email, worker_email);

    res.status(201).json({
      message: "worker is assigned successfully",
      success: true,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't assign ",
      success: error.success || false,
    });
    console.log(error);
  }
}
