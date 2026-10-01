import promotion_service from "../service/promotion.service.js";

export default async function promotion_controller(req, res) {
  const { worker_email } = req.body;
  if (!worker_email) {
    return res.status(403).json({
      message: "worker's email need to promote the person",
      success: false,
    });
  }

  try {
    const is_promoted = await promotion_service(worker_email);

    if (!is_promoted) {
      return res.status(403).json({
        message: "couldn't promote worker",
        success: false,
      });
    }

    res.status(201).json({
      message: `${is_promoted.name} is promoted to manager`,
      success: false,
    });
  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't promote ",
      success: error.success || false,
    });
  }
}
