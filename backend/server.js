import app from "./app.js";
import connecting_to_db from "./config/db_config.js";
import variables from "./config/env_variables.js";

async function server() {
  try {
    await connecting_to_db();
    app.listen(variables.PORT, function () {
      console.log(`hi, server is good to go,${variables.PORT}`);
    });
  } catch (error) {
<<<<<<< HEAD
    console.log("server failed to connect with db");
=======
    console.log(`server failed to connect with db ,error : ${error}`);
>>>>>>> dev
    process.exit(1);
  }
}

server();
