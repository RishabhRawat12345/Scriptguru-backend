const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Task title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Task description is required"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
    },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      required: [true, "Task status is required"],
      default: "todo",
    },
    assignedTo: {
      type: String,
      required: [true, "Assigned user is required"],
      trim: true,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
