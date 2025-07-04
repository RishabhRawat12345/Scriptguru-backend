const Task = require("../Models/AddtaskModel");

const Addtask = async (req, res) => {
  try {
    const { title, description, dueDate, status, assignedTo } = req.body;
    if (!title || !description || !dueDate || !status || !assignedTo) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, description, dueDate, status, assignedTo) are required",
      });
    }

    const allowedStatuses = ["todo", "inprogress", "done"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of ${allowedStatuses.join(", ")}`,
      });
    }
    const dueDateObj = new Date(dueDate);
    if (isNaN(dueDateObj.getTime())) {
      return res.status(400).json({
        success: false,
        message: "dueDate must be a valid date (YYYY‑MM‑DD)",
      });
    }
    const newTask = new Task({
      title,
      description,
      dueDate: dueDateObj,
      status,
      assignedTo,
    });

    await newTask.save();
    res.status(201).json({
      success: true,
      message: "Task added successfully",
      data: newTask,
    });
  } catch (error) {
    console.error("Addtask error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding task",
      error: error.message,
    });
  }
};
const GetAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch tasks", error: error.message });
  }
};

const UpdateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const allowedFields = ["title", "description", "dueDate", "status", "assignedTo"];

    // Filter and pick only allowed fields from req.body
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updatedTask = await Task.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({
      success: true,
      message: "Task updated",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating task",
      error: error.message,
    });
  }
};

const DeleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted", data: deletedTask });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error deleting task", error: error.message });
  }
};

module.exports = { Addtask, GetAllTasks, UpdateTaskStatus, DeleteTask };
