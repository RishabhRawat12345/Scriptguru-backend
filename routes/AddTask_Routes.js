const express = require("express");
const router = express.Router();
const {
  Addtask,
  GetAllTasks,
  UpdateTaskStatus,
  DeleteTask
} = require("../Controllers/AddtaskMiddleware");

router.post("/tasksAdd", Addtask);
router.get("/tasks", GetAllTasks);
router.put("/task/:id/status", UpdateTaskStatus);
router.delete("/task/:id", DeleteTask);

module.exports = router;
