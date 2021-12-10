// Models
const Todo = require("../models/Todo");

// Get all todos
const getAllTodos = async (req, res) => {
  const todos = await Todo.find({});
  try {
    if (todos.length !== 0) {
      res.status(200).json(todos);
    } else {
      res.status(404).json({ Error: "There are not ToDos right now" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get todo by id
const getTodoById = async (req, res) => {
  const { params } = req;

  const todo = await Todo.findById({ _id: params.id });
  try {
    if (todo !== null) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ Error: "Todo not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Add new todo
const createTodo = async (req, res) => {
  const { body } = req;

  const todo = new Todo({ text: body.text });

  try {
    await todo.save(function (err) {
      if (err) {
        res
          .status(400)
          .json({ Error: "A ToDo with the same text already exists" });
      } else {
        res.send(todo);
      }
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update todo
const updateTodo = async (req, res) => {
  const { body } = req;
  const { params } = req;

  try {
    const todo = await Todo.findById({ _id: params.id });
    if (!todo) {
      res.status(404).json({ Error: "ToDo not found" });
    } else {
      const checktodo = await Todo.findOne({ text: body.text });
      if (checktodo !== null && checktodo.id !== params.id) {
        res
          .status(400)
          .json({ Error: "A ToDo with the same text already exists" });
      } else {
        await Todo.findByIdAndUpdate({ _id: params.id }, { text: body.text });
        res.status(200).json({ Message: "ToDo sucessfully updated" });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

// Delete todo
const deleteTodo = async (req, res) => {
  const { params } = req;

  try {
    const todo = await Todo.findById({ _id: params.id });

    if (!todo) {
      res.status(404).json({ Error: "ToDo not found" });
    } else {
      await Todo.findByIdAndDelete({ _id: params.id });
      res.status(200).json({ Message: "ToDo sucessfully deleted!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
