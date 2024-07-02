const express = require("express");
const app = express();
const cors = require("cors");
const { todoIdDesc, todoId } = require("./types.js");
const { todo } = require("./db.js");
app.use(express.json());
app.use(cors());

app.post("/createTodo", async (req, res) => {
  try {
    const parsedPayload = todoIdDesc.safeParse(req.body);
    if (!parsedPayload.success) {
      throw new Error("Invalid payload format");
    }

    await todo.create({
      title: req.body.title,
      description: req.body.description,
      completed: false,
    });

    res.status(201).json({
      msg: "Todo created successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todos = await todo.find();
    res.json({
      todos,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/markComplete", async (req, res) => {
  try {
    const parsedPayload = todoId.safeParse(req.body);
    if (!parsedPayload.success) {
      throw new Error("Invalid payload format");
    }

    await todo.findOneAndUpdate({ _id: req.body._id }, { completed: true });
    res.json({
      msg: "Todo marked as completed!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/markIncomplete", async (req, res) => {
  try {
    const parsedPayload = todoId.safeParse(req.body);
    if (!parsedPayload.success) {
      throw new Error("Invalid payload format");
    }

    await todo.findOneAndUpdate({ _id: req.body._id }, { completed: false });
    res.json({
      msg: "Todo marked as incomplete!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/editTodo", async (req, res) => {
  try {
    const parsedPayload = todoIdDesc.safeParse(req.body);
    if (!parsedPayload.success) {
      throw new Error("Invalid payload format");
    }

    await todo.findOneAndUpdate(
      { _id: req.body._id },
      { title: req.body.title, description: req.body.description }
    );
    res.json({
      msg: "Todo edited successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put("/deleteTodo", async (req, res) => {
  try {
    const parsedPayload = todoId.safeParse(req.body);
    if (!parsedPayload.success) {
      throw new Error("Invalid payload format");
    }

    await todo.deleteOne({ _id: req.body._id });
    res.json({
      msg: "Todo deleted successfully!",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
