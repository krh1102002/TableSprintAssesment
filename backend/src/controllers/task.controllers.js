const Task = require("../db/models/task.models");
const User = require("../db/models/user.models");

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
    });
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Fetch tasks error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({
      title,
      description,
      userId: req.user.id,
    });
    await User.increment("taskCreated", { by: 1, where: { id: req.user.id } });
    res.status(201).json(task);
  } catch (error) {
    console.error("Add task error:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id, title, description, status } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.title = title;
    task.description = description;
    task.status = status;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error("Update task error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.body;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    await task.destroy();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete task error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
