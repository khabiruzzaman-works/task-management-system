import promotion_service from "../service/promotion.service.js";

export default async function promotion_controller(worker_email) {
  try {
    const data = await promotion_service(worker_email);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
