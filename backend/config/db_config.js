import mongoose from "mongoose";
import variables from "./env_variables.js";

export default async function connecting_to_db() {
  await mongoose.connect(variables.MONGODB_URI);
  // console.log("connected to db:", mongoose.connection.name);
  console.log("db is seems to be connect");
}
