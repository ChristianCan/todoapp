const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
