import mongoose, { models } from "mongoose";

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    require: true,
  },
});

const Todo = models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;
