import assign_worker_service from "../service/assign_worker.service";

export default async function assign_worker_controller(
  worker_email,
  manager_email,
  access_token,
) {
  try {
    const data = await assign_worker_service(
      worker_email,
      manager_email,
      access_token,
    );
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}
