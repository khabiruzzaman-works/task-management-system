import get_employee_list_service from "../service/get_employee_list.service.js";


export default async function get_employee_list_controller(req, res) {
  const _id = req.user._id;

  try {
    const employee_list = await get_employee_list_service({ _id });
    if (!employee_list) {
      return res.status(401).json({
        message: "couldn't get employee list",
        succes: false
      })
    }

    if (employee_list.lenth === 0) {
      return res.status(401).json({
        message: " employee list is empty",
        succes: false
      })
    }

    res.status(201).json({
      message: " got employee list",
      succes: true,
      employee_list
    })

  } catch (error) {
    res.status(error.status || 500).json({
      message: error.message || "couldn't get employee list",
      success: error.success || false
    })
  }

  }
