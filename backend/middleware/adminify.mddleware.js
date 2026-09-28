export default async function adminify(req, res, next) {
  if (req.user?.role !== "admin") {
    return res.status(403).json({
      message: "admin only",
      success: false,
    });
  }
  next();
}
