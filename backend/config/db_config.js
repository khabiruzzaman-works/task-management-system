import mongoose from "mongoose";
import variables from "./env_variables.js";

export default async function connecting_to_db() {
  await mongoose.connect(variables.MONGODB_URI);
  console.log("db seems to be connected");
}
