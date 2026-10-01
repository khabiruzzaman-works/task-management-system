import mongoose from "mongoose";

const Task_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
      enum: ["high", "low", "urgent"],
      default: "high",
    },
    status: {
      type: String,
      required: true,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
    assigned_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

const Task = mongoose.model("Task", Task_schema);
export default Task;
