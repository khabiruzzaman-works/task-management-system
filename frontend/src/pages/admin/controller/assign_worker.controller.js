import assign_worker_service from "../service/assign_worker.service.js";

export default async function assign_worker_controller(
  worker_email,
  manager_email,
) {
  try {
    const data = await assign_worker_service(worker_email, manager_email);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
