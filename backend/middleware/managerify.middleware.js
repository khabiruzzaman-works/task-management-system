export default async function managerify(req, res, next) {
  if (req.user?.role !== "manager") {
    return res.status(403).json({
      message: "manager only",
      success: false,
    });
  }
  next();
}
