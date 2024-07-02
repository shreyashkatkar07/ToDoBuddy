const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

const todoSchema = mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
});

const todo = mongoose.model("todos", todoSchema);

module.exports = { todo };
