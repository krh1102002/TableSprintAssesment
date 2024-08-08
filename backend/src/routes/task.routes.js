const express = require("express");
const {
  addTask,
  updateTask,
  deleteTask,
  getAllTasks,
} = require("../controllers/task.controllers");
const { isAuthorized } = require("../utils/isAuthorized");

const router = express.Router();

//Getting all tasks of User
router.get("/", isAuthorized, getAllTasks);

//For Adding Tasks
router.post("/", isAuthorized, addTask);

// For Updating a Tasks
router.put("/", isAuthorized, updateTask);

// For Deleting a Task
router.delete("/", isAuthorized, deleteTask);

module.exports = router;
