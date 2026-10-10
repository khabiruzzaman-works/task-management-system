import pass_change_service from "../service/pass_change.service.js";

export default async function pass_change_controller(
  new_password,
  current_password,
) {
  try {
    const data = await pass_change_service(new_password, current_password);
    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error.message, success: false };
  }
}
