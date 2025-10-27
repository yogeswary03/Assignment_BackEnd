const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/todoDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Schema & Model
const todoSchema = new mongoose.Schema({
  task: String,
  date: String,
  venue: String,
  status: { type: String, default: "pending" },
});
const Todo = mongoose.model("Todo", todoSchema);

// ------------------- Routes -------------------

// Get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a new todo
app.post("/todos", async (req, res) => {
  const { task, date, venue, status } = req.body;
  const newTodo = new Todo({ task, date, venue, status });
  await newTodo.save();
  res.json(newTodo);
});

// Update an existing todo by ID
app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const { task, date, venue, status } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { task, date, venue, status },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo" });
  }
});

// Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo" });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));