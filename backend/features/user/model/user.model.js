import mongoose from "mongoose";

const User_schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 60,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: 6,
      maxlength: 254,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["admin", "worker"],
      default: "worker",
    },
    reference: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    refresh_token: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", User_schema);
export default User;
