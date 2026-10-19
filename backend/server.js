import app from "./app.js";
import connecting_to_db from "./config/db_config.js";
import variables from "./config/env_variables.js";

async function server() {
  try {
    await connecting_to_db();
    app.listen(variables.PORT, function () {
      console.log("hi, server is good to go");
    });
  } catch (error) {
    console.log(`server failed to connect with db ,error : ${error}`);
    process.exit(1);
  }
}

server();
