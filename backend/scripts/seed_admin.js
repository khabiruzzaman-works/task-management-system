import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import variables from "../config/env_variables.js";
import connecting_to_db from "../config/db_config.js";
import User from "../features/user/model/user.model.js";

// Creates the first admin account (there is no public sign-up).
// Usage: npm run seed:admin   (reads ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD from .env)

const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;

async function seed_admin() {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
  }

  const email = ADMIN_EMAIL.trim().toLowerCase();

  if (email.split("@")[1] !== variables.ORG_DOMAIN) {
    throw new Error(
      `ADMIN_EMAIL must end with @${variables.ORG_DOMAIN} (ORG_DOMAIN), otherwise this admin could not log in`,
    );
  }
  if (ADMIN_PASSWORD.length < 8 || ADMIN_PASSWORD.length > 72) {
    throw new Error("ADMIN_PASSWORD must be between 8 and 72 characters");
  }

  await connecting_to_db();

  const already_exists = await User.findOne({ email });
  if (already_exists) {
    console.log(`admin ${email} already exists, nothing to do`);
    return;
  }

  await User.create({
    name: ADMIN_NAME || "Admin",
    email,
    password: await bcryptjs.hash(ADMIN_PASSWORD, 10),
    role: "admin",
  });

  console.log(`admin created: ${email}`);
}

seed_admin()
  .catch(function (error) {
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(function () {
    mongoose.disconnect();
  });
