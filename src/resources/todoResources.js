// Modules
const express = require("express");
const TodoResources = express.Router();

//Controllers
const { TodoControllers } = require("../controllers");

//Middleware
const { check } = require("express-validator");

///Custom Middleware to check input data types
const validateInput = (req, res, next) => {
  const { body } = req;
  let errorArray = [];
  if (typeof body.text !== "string") {
    errorArray.push({
      message: "Ups! text should be a string!",
    });
  }

  if (errorArray.length === 0) {
    return next();
  } else {
    return res.status(400).json({
      error: errorArray.map((element) => {
        return element.message;
      }),
    });
  }
};

///Third Party Middleware - Express Validator
const checkTodo = [
  check("text", "text should be at least 2 characters long")
    .isLength({ min: 2 })
    .trim(),
];

const validateTodo = (req, res, next) => {
  const { validationResult } = require("express-validator");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array().map((element) => {
        return element.msg;
      }),
    });
  }
  return next();
};

//All book resources
TodoResources.get("/", TodoControllers.getAllTodos);
TodoResources.get("/:id", TodoControllers.getTodoById);
TodoResources.post(
  "/",
  validateInput,
  checkTodo,
  validateTodo,
  TodoControllers.createTodo
);
TodoResources.put(
  "/:id",
  validateInput,
  checkTodo,
  validateTodo,
  TodoControllers.updateTodo
);
TodoResources.delete("/:id", TodoControllers.deleteTodo);

module.exports = TodoResources;
