const express = require("express");
const { User } = require("../models/User");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

router.post("/add", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.todos.push({ text: req.body.text });
    await user.save();
    res.json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Error adding todo", error });
  }
});

router.put("/edit/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    await user.updateTodo(req.params.id, req.body.text);
    res.json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Error editing todo", error });
  }
});

router.delete("/delete/:id", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const todoId = req.params.id;

    user.todos = user.todos.filter((todo) => todo._id.toString() !== todoId);
    await user.save();

    res.json({ todos: user.todos });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
});

module.exports = router;
