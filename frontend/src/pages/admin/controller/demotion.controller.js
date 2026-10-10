import demotion_service from "../service/demotion.service.js";

export default async function demotion_controller(worker_email) {
  try {
    const data = await demotion_service(worker_email);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
