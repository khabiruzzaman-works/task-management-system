import promotion_service from "../service/promotion.service.js";

export default async function promotion_controller(worker_email,access_token) {


  try {
    const data = await promotion_service(worker_email, access_token);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}
