import demotion_service from "../service/demotion.service.js";

export default async function demotion_controller(req, res) {
  const { worker_email } = req.body;
  console.log(worker_email)
  if (!worker_email) {
    return res.status(403).json({
      message: "manager's email need to demote the person",
      success: false,
    });
  }

  try {
    const is_demoted = await demotion_service(worker_email);

    if (!is_demoted) {
      return res.status(409).json({
        message: "couldn't demote worker",
        success: false,
      });
    }

    res.status(201).json({
      message: `${is_demoted.name} is demoted to worker`,
      success: false,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't demote ",
      success: error.success || false,
    });
    console.log(error);
  }
}
